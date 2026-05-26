import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import * as FlagIcons from 'country-flag-icons/react/3x2';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
    type ComponentType,
    type SVGProps,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

type CountryIsoCode =
    | 'AR'
    | 'BR'
    | 'CA'
    | 'CL'
    | 'CO'
    | 'ES'
    | 'MX'
    | 'PE'
    | 'US'
    | 'VE';

export type CountryConfig = {
    isoCode: CountryIsoCode;
    code: `+${string}`;
    name: string;
    mask: string;
};

export const countryList: CountryConfig[] = [
    { isoCode: 'VE', code: '+58', name: 'Venezuela', mask: '0___-_______' },
    { isoCode: 'AR', code: '+54', name: 'Argentina', mask: '__ ____-____' },
    { isoCode: 'BR', code: '+55', name: 'Brazil', mask: '(__) _____-____' },
    { isoCode: 'CA', code: '+1', name: 'Canada', mask: '(___) ___-____' },
    { isoCode: 'CL', code: '+56', name: 'Chile', mask: '_ ____ ____' },
    { isoCode: 'CO', code: '+57', name: 'Colombia', mask: '___ ___ ____' },
    { isoCode: 'MX', code: '+52', name: 'Mexico', mask: '__ ____ ____' },
    { isoCode: 'PE', code: '+51', name: 'Peru', mask: '___ ___ ___' },
    { isoCode: 'ES', code: '+34', name: 'Spain', mask: '___ __ __ __' },
    {
        isoCode: 'US',
        code: '+1',
        name: 'United States',
        mask: '(___) ___-____',
    },
];

export const defaultCountry =
    countryList.find(
        ({ code, name }) => code === '+58' && name === 'Venezuela',
    ) ?? countryList[0];

type FlagComponent = ComponentType<SVGProps<SVGSVGElement>>;

export function CountryFlag({
    country,
    className,
}: {
    country: CountryConfig;
    className: string;
}) {
    const Flag = FlagIcons[country.isoCode] as FlagComponent | undefined;

    if (!Flag) {
        return (
            <span className={className} aria-hidden="true">
                {country.isoCode}
            </span>
        );
    }

    return <Flag aria-label={country.name} className={className} role="img" />;
}

function getDigits(value: string) {
    return value.replace(/\D/g, '');
}

function countMaskSlots(mask: string) {
    return (mask.match(/_/g) ?? []).length;
}

function normalizePhoneDigitsByCountry(digits: string, country: CountryConfig) {
    let normalizedDigits = digits;

    if (country.code === '+58' && normalizedDigits.startsWith('0')) {
        normalizedDigits = normalizedDigits.slice(1);
    }

    return normalizedDigits.slice(0, countMaskSlots(country.mask));
}

function applyMask(digits: string, mask: string) {
    let slotIndex = 0;
    let output = '';
    const filledSlots = digits.length;

    for (const char of mask) {
        if (char === '_') {
            if (slotIndex >= filledSlots) {
                break;
            }

            output += digits[slotIndex];
            slotIndex += 1;
        } else if (filledSlots > 0 && slotIndex < filledSlots) {
            output += char;
        }
    }

    return output;
}

function countDigitsBeforePosition(
    value: string,
    position: number,
    country: CountryConfig,
) {
    let digitsBefore = getDigits(value.slice(0, position)).length;

    if (country.code === '+58' && value.startsWith('0') && position > 0) {
        digitsBefore = Math.max(0, digitsBefore - 1);
    }

    return digitsBefore;
}

function getCaretPositionForDigitIndex(
    value: string,
    digitIndex: number,
    country: CountryConfig,
) {
    if (digitIndex <= 0) {
        if (country.code === '+58' && value.startsWith('0')) {
            return 1;
        }

        return 0;
    }

    let seenDigits = 0;
    let prefixHandled = false;

    for (let index = 0; index < value.length; index += 1) {
        if (/\d/.test(value[index])) {
            if (
                country.code === '+58' &&
                value.startsWith('0') &&
                !prefixHandled &&
                index === 0
            ) {
                prefixHandled = true;
                continue;
            }

            seenDigits += 1;

            if (seenDigits === digitIndex) {
                return index + 1;
            }
        }
    }

    return value.length;
}

type PhoneFieldProps = {
    id: string;
    name?: string;
    required?: boolean;
    tabIndex?: number;
    autoComplete?: string;
    error?: string;
    searchPlaceholder?: string;
    searchEmptyLabel?: string;
};

export default function PhoneField({
    id,
    name = 'phone',
    required = true,
    tabIndex,
    autoComplete,
    error,
    searchPlaceholder = 'Search country',
    searchEmptyLabel = 'No results.',
}: PhoneFieldProps) {
    const [selectedCountry, setSelectedCountry] =
        useState<CountryConfig>(defaultCountry);
    const [countryFilter, setCountryFilter] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const phoneInputRef = useRef<HTMLInputElement | null>(null);
    const pendingCaretDigitIndexRef = useRef<number | null>(null);

    const filteredCountries = useMemo(() => {
        const filter = countryFilter.trim().toLowerCase();

        if (!filter) {
            return countryList;
        }

        return countryList.filter(({ name, code }) => {
            return (
                name.toLowerCase().includes(filter) ||
                code.toLowerCase().includes(filter)
            );
        });
    }, [countryFilter]);

    const normalizedPhone = useMemo(() => {
        return `${selectedCountry.code}${getDigits(phoneNumber)}`;
    }, [phoneNumber, selectedCountry.code]);

    const maskedPhoneValue = useMemo(() => {
        return applyMask(getDigits(phoneNumber), selectedCountry.mask);
    }, [phoneNumber, selectedCountry.mask]);

    useLayoutEffect(() => {
        const pendingDigitIndex = pendingCaretDigitIndexRef.current;

        if (pendingDigitIndex === null) {
            return;
        }

        const element = phoneInputRef.current;

        if (!element) {
            pendingCaretDigitIndexRef.current = null;
            return;
        }

        const nextCaretPosition = getCaretPositionForDigitIndex(
            maskedPhoneValue,
            pendingDigitIndex,
            selectedCountry,
        );

        element.setSelectionRange(nextCaretPosition, nextCaretPosition);
        pendingCaretDigitIndexRef.current = null;
    }, [maskedPhoneValue, selectedCountry]);

    return (
        <>
            <input type="hidden" name={name} value={normalizedPhone} />

            <div className="flex gap-2">
                <Listbox
                    value={selectedCountry}
                    onChange={(country) => {
                        setSelectedCountry(country);
                        setCountryFilter('');
                        setPhoneNumber((previous) => {
                            const digits = getDigits(previous);
                            const maxLength = countMaskSlots(country.mask);

                            return digits.slice(0, maxLength);
                        });
                    }}
                >
                    <div className="relative w-[220px]">
                        <ListboxButton
                            id={`${id}-prefix`}
                            className="flex h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
                        >
                            <CountryFlag
                                country={selectedCountry}
                                className="h-4 w-5 shrink-0 overflow-hidden rounded-[2px]"
                            />
                            <span className="tabular-nums">
                                {selectedCountry.code}
                            </span>
                            <ChevronsUpDown className="ml-auto size-4 opacity-60" />
                        </ListboxButton>

                        <ListboxOptions className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-input bg-popover/90 shadow-md backdrop-blur-md">
                            {countryList.length > 5 && (
                                <div className="border-b border-input p-2">
                                    <Input
                                        value={countryFilter}
                                        onChange={(event) =>
                                            setCountryFilter(event.target.value)
                                        }
                                        placeholder={searchPlaceholder}
                                        className="h-8"
                                    />
                                </div>
                            )}

                            <div className="max-h-56 overflow-auto p-1">
                                {filteredCountries.length === 0 ? (
                                    <p className="px-2 py-1.5 text-sm text-muted-foreground">
                                        {searchEmptyLabel}
                                    </p>
                                ) : (
                                    filteredCountries.map((country) => (
                                        <ListboxOption
                                            key={`${country.code}-${country.name}`}
                                            value={country}
                                            className="group flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-foreground data-[focus]:bg-accent data-[focus]:text-accent-foreground"
                                        >
                                            <CountryFlag
                                                country={country}
                                                className="h-4 w-5 shrink-0 overflow-hidden rounded-[2px]"
                                            />
                                            <span className="w-9 shrink-0 text-right tabular-nums">
                                                {country.code}
                                            </span>
                                            <span className="truncate text-muted-foreground group-data-[focus]:text-accent-foreground">
                                                {country.name}
                                            </span>
                                            <Check className="ml-auto size-4 opacity-0 group-data-[selected]:opacity-100" />
                                        </ListboxOption>
                                    ))
                                )}
                            </div>
                        </ListboxOptions>
                    </div>
                </Listbox>

                <Input
                    id={id}
                    ref={phoneInputRef}
                    type="tel"
                    required={required}
                    tabIndex={tabIndex}
                    autoComplete={autoComplete}
                    inputMode="numeric"
                    maxLength={selectedCountry.mask.length}
                    placeholder={selectedCountry.mask}
                    value={maskedPhoneValue}
                    onKeyDown={(event) => {
                        if (event.key !== 'Backspace') {
                            return;
                        }

                        const { selectionStart, selectionEnd } =
                            event.currentTarget;

                        if (
                            selectionStart === null ||
                            selectionEnd === null ||
                            selectionStart !== selectionEnd
                        ) {
                            return;
                        }

                        const removeAt =
                            countDigitsBeforePosition(
                                maskedPhoneValue,
                                selectionStart,
                                selectedCountry,
                            ) - 1;

                        if (removeAt < 0) {
                            return;
                        }

                        event.preventDefault();
                        pendingCaretDigitIndexRef.current = removeAt;

                        setPhoneNumber((previous) => {
                            const digits = getDigits(previous);

                            if (removeAt >= digits.length) {
                                return digits;
                            }

                            return (
                                digits.slice(0, removeAt) +
                                digits.slice(removeAt + 1)
                            );
                        });
                    }}
                    onChange={(event) => {
                        const caretPosition =
                            event.currentTarget.selectionStart;

                        if (caretPosition !== null) {
                            pendingCaretDigitIndexRef.current =
                                countDigitsBeforePosition(
                                    event.target.value,
                                    caretPosition,
                                    selectedCountry,
                                );
                        }

                        const digits = normalizePhoneDigitsByCountry(
                            getDigits(event.target.value),
                            selectedCountry,
                        );

                        setPhoneNumber(digits);
                    }}
                />
            </div>

            <InputError message={error} />
        </>
    );
}

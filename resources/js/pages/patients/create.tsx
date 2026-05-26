import InputError from '@/components/input-error';
import PhoneField, {
    CountryFlag,
    countryList,
    defaultCountry,
    type CountryConfig,
} from '@/components/phone-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
} from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useMemo, useState } from 'react';

function capitalizeWords(value: string) {
    return value.replace(/\b([a-z\u00C0-\u017F])/g, (match) =>
        match.toUpperCase(),
    );
}

export default function CreatePatient() {
    const { dashboardTranslations } = usePage<SharedData>().props;
    const [gender, setGender] = useState('');
    const [genderClientError, setGenderClientError] = useState('');
    const [birthplaceCountry, setBirthplaceCountry] =
        useState<CountryConfig>(defaultCountry);
    const [birthplaceCountryFilter, setBirthplaceCountryFilter] = useState('');
    const [birthplaceLocality, setBirthplaceLocality] = useState('');

    const today = new Date();
    const birthdateMax = `${today.getFullYear()}-${String(
        today.getMonth() + 1,
    ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const birthdateMin = `${today.getFullYear() - 120}-01-01`;

    const filteredBirthplaceCountries = useMemo(() => {
        const filter = birthplaceCountryFilter.trim().toLowerCase();

        if (!filter) {
            return countryList;
        }

        return countryList.filter(({ name, code }) => {
            return (
                name.toLowerCase().includes(filter) ||
                code.toLowerCase().includes(filter)
            );
        });
    }, [birthplaceCountryFilter]);

    const normalizedBirthplace = useMemo(() => {
        const locality = birthplaceLocality.trim();

        if (!locality) {
            return '';
        }

        return `${locality}, ${birthplaceCountry.name}`;
    }, [birthplaceCountry.name, birthplaceLocality]);

    const listTitle = dashboardTranslations?.patients ?? 'Patients';
    const title = dashboardTranslations?.patients_create_title ?? 'New patient';
    const description =
        dashboardTranslations?.patients_create_description ??
        'Create a new patient record.';
    const backToPatientsLabel =
        dashboardTranslations?.patients_create_back ?? 'Back to patients';
    const genderRequiredLabel =
        dashboardTranslations?.patients_create_gender_required ??
        'Please select a gender.';
    const countrySearchPlaceholder =
        dashboardTranslations?.patients_create_country_search_placeholder ??
        'Search country';
    const countrySearchEmpty =
        dashboardTranslations?.patients_create_country_search_empty ??
        'No results.';
    const fieldIdLabel =
        dashboardTranslations?.patients_create_field_id ?? 'Patient ID';
    const fieldFullnameLabel =
        dashboardTranslations?.patients_create_field_fullname ?? 'Full name';
    const fieldEmailLabel =
        dashboardTranslations?.patients_create_field_email ?? 'Email';
    const fieldPhoneLabel =
        dashboardTranslations?.patients_create_field_phone ?? 'Phone';
    const fieldAgeLabel =
        dashboardTranslations?.patients_create_field_age ?? 'Age';
    const fieldGenderLabel =
        dashboardTranslations?.patients_create_field_gender ?? 'Gender';
    const fieldBirthdateLabel =
        dashboardTranslations?.patients_create_field_birthdate ?? 'Birthdate';
    const fieldBirthplaceLabel =
        dashboardTranslations?.patients_create_field_birthplace ?? 'Birthplace';
    const fieldAddressLabel =
        dashboardTranslations?.patients_create_field_address ?? 'Address';
    const genderPlaceholder =
        dashboardTranslations?.patients_create_gender_placeholder ??
        'Select gender';
    const genderMaleLabel =
        dashboardTranslations?.patients_create_gender_male ?? 'Male';
    const genderFemaleLabel =
        dashboardTranslations?.patients_create_gender_female ?? 'Female';
    const cancelLabel =
        dashboardTranslations?.patients_create_cancel ?? 'Cancel';
    const submitLabel =
        dashboardTranslations?.patients_create_submit ?? 'Create patient';
    const birthdateTitle =
        dashboardTranslations?.patients_create_birthdate_title ??
        'Birthdate must be within a valid range.';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: listTitle,
            href: '/patients',
        },
        {
            title,
            href: '/patients/create',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-xl font-semibold">{title}</h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {description}
                            </p>
                        </div>

                        <Button variant="outline" asChild>
                            <Link href="/patients">{backToPatientsLabel}</Link>
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <Form
                        action="/patients"
                        method="post"
                        disableWhileProcessing
                        className="grid gap-6"
                        onSubmitCapture={(event) => {
                            if (gender) {
                                setGenderClientError('');
                                return;
                            }

                            event.preventDefault();
                            setGenderClientError(genderRequiredLabel);
                        }}
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="id">
                                            {fieldIdLabel}
                                        </Label>
                                        <Input
                                            id="id"
                                            name="id"
                                            type="text"
                                            required
                                            autoFocus
                                            placeholder="V7907552"
                                        />
                                        <InputError message={errors.id} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="fullname">
                                            {fieldFullnameLabel}
                                        </Label>
                                        <Input
                                            id="fullname"
                                            name="fullname"
                                            type="text"
                                            required
                                            onInput={(event) => {
                                                const input =
                                                    event.currentTarget;
                                                input.value = capitalizeWords(
                                                    input.value,
                                                );
                                            }}
                                            placeholder="Andres Mejia"
                                        />
                                        <InputError message={errors.fullname} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">
                                            {fieldEmailLabel}
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                            title="Use a valid email like name@domain.com"
                                            placeholder="andmejia24@mail.com"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="phone-number">
                                            {fieldPhoneLabel}
                                        </Label>
                                        <PhoneField
                                            id="phone-number"
                                            name="phone"
                                            error={errors.phone}
                                            searchPlaceholder={
                                                countrySearchPlaceholder
                                            }
                                            searchEmptyLabel={
                                                countrySearchEmpty
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="age">
                                            {fieldAgeLabel}
                                        </Label>
                                        <Input
                                            id="age"
                                            name="age"
                                            type="number"
                                            min="1"
                                            max="120"
                                            required
                                            placeholder="27"
                                        />
                                        <InputError message={errors.age} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="gender">
                                            {fieldGenderLabel}
                                        </Label>
                                        <input
                                            type="hidden"
                                            name="gender"
                                            value={gender}
                                        />
                                        <Select
                                            value={gender}
                                            onValueChange={(value) => {
                                                setGender(value);
                                                setGenderClientError('');
                                            }}
                                        >
                                            <SelectTrigger id="gender">
                                                <SelectValue
                                                    placeholder={
                                                        genderPlaceholder
                                                    }
                                                />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="M">
                                                    {genderMaleLabel}
                                                </SelectItem>
                                                <SelectItem value="F">
                                                    {genderFemaleLabel}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError
                                            message={
                                                genderClientError ||
                                                errors.gender
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="birthdate">
                                            {fieldBirthdateLabel}
                                        </Label>
                                        <Input
                                            id="birthdate"
                                            name="birthdate"
                                            type="date"
                                            required
                                            min={birthdateMin}
                                            max={birthdateMax}
                                            title={birthdateTitle}
                                        />
                                        <InputError
                                            message={errors.birthdate}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="birthplace-locality">
                                            {fieldBirthplaceLabel}
                                        </Label>
                                        <input
                                            type="hidden"
                                            name="birthplace"
                                            value={normalizedBirthplace}
                                        />
                                        <div className="flex gap-2">
                                            <Listbox
                                                value={birthplaceCountry}
                                                onChange={(country) => {
                                                    setBirthplaceCountry(
                                                        country,
                                                    );
                                                    setBirthplaceCountryFilter(
                                                        '',
                                                    );
                                                }}
                                            >
                                                <div className="relative w-[220px]">
                                                    <ListboxButton
                                                        id="birthplace-country"
                                                        className="flex h-9 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40"
                                                    >
                                                        <CountryFlag
                                                            country={
                                                                birthplaceCountry
                                                            }
                                                            className="h-4 w-5 shrink-0 overflow-hidden rounded-[2px]"
                                                        />
                                                        <span className="truncate">
                                                            {
                                                                birthplaceCountry.name
                                                            }
                                                        </span>
                                                        <ChevronsUpDown className="ml-auto size-4 opacity-60" />
                                                    </ListboxButton>

                                                    <ListboxOptions className="absolute z-50 mt-1 w-full overflow-hidden rounded-md border border-input bg-popover/90 shadow-md backdrop-blur-md">
                                                        {countryList.length >
                                                            5 && (
                                                            <div className="border-b border-input p-2">
                                                                <Input
                                                                    value={
                                                                        birthplaceCountryFilter
                                                                    }
                                                                    onChange={(
                                                                        event,
                                                                    ) =>
                                                                        setBirthplaceCountryFilter(
                                                                            event
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder={
                                                                        countrySearchPlaceholder
                                                                    }
                                                                    className="h-8"
                                                                />
                                                            </div>
                                                        )}

                                                        <div className="max-h-56 overflow-auto p-1">
                                                            {filteredBirthplaceCountries.length ===
                                                            0 ? (
                                                                <p className="px-2 py-1.5 text-sm text-muted-foreground">
                                                                    {
                                                                        countrySearchEmpty
                                                                    }
                                                                </p>
                                                            ) : (
                                                                filteredBirthplaceCountries.map(
                                                                    (
                                                                        country,
                                                                    ) => (
                                                                        <ListboxOption
                                                                            key={`${country.code}-${country.name}`}
                                                                            value={
                                                                                country
                                                                            }
                                                                            className="group flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-foreground data-[focus]:bg-accent data-[focus]:text-accent-foreground"
                                                                        >
                                                                            <CountryFlag
                                                                                country={
                                                                                    country
                                                                                }
                                                                                className="h-4 w-5 shrink-0 overflow-hidden rounded-[2px]"
                                                                            />
                                                                            <span className="truncate text-muted-foreground group-data-[focus]:text-accent-foreground">
                                                                                {
                                                                                    country.name
                                                                                }
                                                                            </span>
                                                                            <Check className="ml-auto size-4 opacity-0 group-data-[selected]:opacity-100" />
                                                                        </ListboxOption>
                                                                    ),
                                                                )
                                                            )}
                                                        </div>
                                                    </ListboxOptions>
                                                </div>
                                            </Listbox>

                                            <Input
                                                id="birthplace-locality"
                                                type="text"
                                                required
                                                value={birthplaceLocality}
                                                onChange={(event) =>
                                                    setBirthplaceLocality(
                                                        event.target.value,
                                                    )
                                                }
                                                onInput={(event) => {
                                                    const input =
                                                        event.currentTarget;
                                                    const capitalizedValue =
                                                        capitalizeWords(
                                                            input.value,
                                                        );

                                                    input.value =
                                                        capitalizedValue;
                                                    setBirthplaceLocality(
                                                        capitalizedValue,
                                                    );
                                                }}
                                                placeholder="Valencia, Carabobo"
                                            />
                                        </div>
                                        <InputError
                                            message={errors.birthplace}
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="address">
                                        {fieldAddressLabel}
                                    </Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        type="text"
                                        required
                                        placeholder="Avenida Universidad, entre calle 8 y 9, casa #190-87, Tarapio, Naguanagua"
                                    />
                                    <InputError message={errors.address} />
                                </div>

                                <InputError message={errors.patient} />

                                <div className="flex justify-end gap-3">
                                    <Button variant="outline" asChild>
                                        <Link href="/patients">
                                            {cancelLabel}
                                        </Link>
                                    </Button>
                                    <Button type="submit">
                                        {processing && <Spinner />}
                                        {submitLabel}
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </AppLayout>
    );
}

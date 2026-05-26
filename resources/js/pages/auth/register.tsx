import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import PhoneField from '@/components/phone-field';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

interface RegisterProps {
    translations?: {
        page_title: string;
        title: string;
        description: string;
        id_label: string;
        id_placeholder: string;
        fullname_label: string;
        fullname_placeholder: string;
        email_label: string;
        email_placeholder: string;
        phone_label: string;
        phone_placeholder: string;
        role_label: string;
        role_user_option: string;
        password_label: string;
        password_placeholder: string;
        password_confirm_label: string;
        password_confirm_placeholder: string;
        submit: string;
        login_prompt: string;
        login_link: string;
    };
}

export default function Register({ translations }: RegisterProps) {
    return (
        <AuthLayout
            title={translations?.title ?? 'Create an account'}
            description={
                translations?.description ??
                'Enter your details below to create your account'
            }
        >
            <Head title={translations?.page_title ?? 'Register'} />
            <Form
                {...RegisteredUserController.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="id">
                                    {translations?.id_label ?? 'Personal ID'}
                                </Label>
                                <Input
                                    id="id"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="off"
                                    name="id"
                                    placeholder={
                                        translations?.id_placeholder ??
                                        'ID number'
                                    }
                                />
                                <InputError message={errors.id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="fullname">
                                    {translations?.fullname_label ??
                                        'Full name'}
                                </Label>
                                <Input
                                    id="fullname"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    autoComplete="name"
                                    name="fullname"
                                    placeholder={
                                        translations?.fullname_placeholder ??
                                        'Full name'
                                    }
                                />
                                <InputError message={errors.fullname} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    {translations?.email_label ??
                                        'Email address'}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={3}
                                    autoComplete="email"
                                    name="email"
                                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                    title="Use a valid email like name@domain.com"
                                    placeholder={
                                        translations?.email_placeholder ??
                                        'email@example.com'
                                    }
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="phone">
                                    {translations?.phone_label ?? 'Phone'}
                                </Label>
                                <PhoneField
                                    id="phone"
                                    name="phone"
                                    tabIndex={4}
                                    autoComplete="tel"
                                    error={errors.phone}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    {translations?.password_label ?? 'Password'}
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={5}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder={
                                        translations?.password_placeholder ??
                                        'Password'
                                    }
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation">
                                    {translations?.password_confirm_label ??
                                        'Confirm password'}
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={6}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder={
                                        translations?.password_confirm_placeholder ??
                                        'Confirm password'
                                    }
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="role">
                                    {translations?.role_label ?? 'Role'}
                                </Label>
                                <select
                                    id="role"
                                    required
                                    tabIndex={7}
                                    name="role"
                                    defaultValue="user"
                                    className="flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground dark:aria-invalid:ring-destructive/40"
                                >
                                    <option value="user">
                                        {translations?.role_user_option ??
                                            'User'}
                                    </option>
                                </select>
                                <InputError message={errors.role} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={8}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                {translations?.submit ?? 'Create account'}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            {translations?.login_prompt ??
                                'Already have an account?'}{' '}
                            <TextLink href={login()} tabIndex={9}>
                                {translations?.login_link ?? 'Log in'}
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}

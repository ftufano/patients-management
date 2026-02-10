import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
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
        name_label: string;
        name_placeholder: string;
        email_label: string;
        email_placeholder: string;
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
                                <Label htmlFor="name">
                                    {translations?.name_label ?? 'Name'}
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder={
                                        translations?.name_placeholder ??
                                        'Full name'
                                    }
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
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
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder={
                                        translations?.email_placeholder ??
                                        'email@example.com'
                                    }
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password">
                                    {translations?.password_label ?? 'Password'}
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
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
                                    tabIndex={4}
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

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                {translations?.submit ?? 'Create account'}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            {translations?.login_prompt ??
                                'Already have an account?'}{' '}
                            <TextLink href={login()} tabIndex={6}>
                                {translations?.login_link ?? 'Log in'}
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    translations?: {
        page_title: string;
        title: string;
        description: string;
        email_label: string;
        email_placeholder: string;
        password_label: string;
        password_placeholder: string;
        forgot_password: string;
        remember_me: string;
        submit: string;
        signup_prompt: string;
        signup_link: string;
    };
}

export default function Login({
    status,
    canResetPassword,
    translations,
}: LoginProps) {
    return (
        <AuthLayout
            title={translations?.title ?? 'Log in to your account'}
            description={
                translations?.description ??
                'Enter your email and password below to log in'
            }
        >
            <Head title={translations?.page_title ?? 'Log in'} />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">
                                    {translations?.email_label ??
                                        'Email address'}
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder={
                                        translations?.email_placeholder ??
                                        'email@example.com'
                                    }
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">
                                        {translations?.password_label ??
                                            'Password'}
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-sm"
                                            tabIndex={5}
                                        >
                                            {translations?.forgot_password ??
                                                'Forgot password?'}
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder={
                                        translations?.password_placeholder ??
                                        'Password'
                                    }
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                />
                                <Label htmlFor="remember">
                                    {translations?.remember_me ?? 'Remember me'}
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                {translations?.submit ?? 'Log in'}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            {translations?.signup_prompt ??
                                "Don't have an account?"}{' '}
                            <TextLink href={register()} tabIndex={5}>
                                {translations?.signup_link ?? 'Sign up'}
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}

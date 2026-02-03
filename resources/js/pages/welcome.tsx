import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div
                className="relative flex min-h-screen flex-col items-center bg-[#081b24] bg-center bg-no-repeat p-6 text-[#d7f4ff] lg:justify-center lg:p-8 dark:bg-[#06141b]"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at center, rgba(12, 37, 50, 0.05), rgba(7, 24, 32, 0.2)), url('/images/welcome-bg.jpg')",
                    backgroundSize: 'auto 100%',
                }}
            >
                <div className="absolute inset-0 bg-[#071820]/0" />
                <header className="relative z-10 mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-sm border border-[#1e4f61] px-5 py-1.5 text-sm leading-normal text-[#1e4f61] transition duration-200 ease-out hover:border-[#2a6a80] hover:bg-[#d7f4ff]/40 hover:shadow-[0_0_0_1px_rgba(30,79,97,0.25)] focus-visible:ring-2 focus-visible:ring-[#37c6e8]/60 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] active:bg-[#d7f4ff]/60 dark:border-[#1e4f61] dark:text-[#1e4f61] dark:hover:border-[#2a6a80] dark:hover:bg-[#d7f4ff]/30"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1e4f61] transition duration-200 ease-out hover:border-[#1e4f61] hover:bg-[#d7f4ff]/40 hover:shadow-[0_0_0_1px_rgba(30,79,97,0.2)] focus-visible:ring-2 focus-visible:ring-[#37c6e8]/60 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] active:bg-[#d7f4ff]/60 dark:text-[#1e4f61] dark:hover:border-[#2a6a80] dark:hover:bg-[#d7f4ff]/30"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={register()}
                                    className="inline-block rounded-sm border border-[#1e4f61] px-5 py-1.5 text-sm leading-normal text-[#1e4f61] transition duration-200 ease-out hover:border-[#2a6a80] hover:bg-[#d7f4ff]/40 hover:shadow-[0_0_0_1px_rgba(30,79,97,0.25)] focus-visible:ring-2 focus-visible:ring-[#37c6e8]/60 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] active:bg-[#d7f4ff]/60 dark:border-[#1e4f61] dark:text-[#1e4f61] dark:hover:border-[#2a6a80] dark:hover:bg-[#d7f4ff]/30"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
                <div className="relative z-10 flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-[#0b2431] p-8 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(55,198,232,0.3)] lg:rounded-tl-lg lg:rounded-br-none lg:p-16 dark:bg-[#091e28] dark:text-[#d7f4ff] dark:shadow-[inset_0px_0px_0px_1px_rgba(55,198,232,0.25)]">
                            <h1 className="text-2xl font-semibold tracking-tight text-[#d7f4ff] lg:text-3xl">
                                Patients Manager
                            </h1>
                            <p className="mt-2 text-sm text-[#9ed8e8]">
                                Streamline appointments, records, and care.
                            </p>
                        </div>
                        <div
                            className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-lg bg-[#0a2230] bg-cover bg-center lg:mb-0 lg:-ml-px lg:aspect-auto lg:w-[438px] lg:rounded-t-none lg:rounded-r-lg dark:bg-[#071b24]"
                            style={{
                                backgroundImage:
                                    "url('/images/patients-panel.png')",
                            }}
                        >
                            <div className="absolute inset-0 rounded-t-lg shadow-[inset_0px_0px_0px_1px_rgba(10,34,48,0.4)] lg:rounded-t-none lg:rounded-r-lg" />
                        </div>
                    </main>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}

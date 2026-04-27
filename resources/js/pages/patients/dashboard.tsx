import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface PatientListItem {
    id: string;
    fullname: string;
    email: string;
    phone: string | null;
    age: number | null;
    gender: string | null;
}

export default function Patients() {
    const { dashboardTranslations, patients } = usePage<
        SharedData & { patients: PatientListItem[] }
    >().props;
    const [search, setSearch] = useState('');

    const title = dashboardTranslations?.patients ?? 'Patients';

    const filteredPatients = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) {
            return patients;
        }

        return patients.filter((patient) => {
            const rowText = [
                patient.id,
                patient.fullname,
                patient.email,
                patient.phone,
                patient.age,
                patient.gender,
            ]
                .filter((value) => value !== null && value !== undefined)
                .join(' ')
                .toLowerCase();

            return rowText.includes(term);
        });
    }, [patients, search]);

    const patientCountLabel =
        filteredPatients.length === 1
            ? (dashboardTranslations?.patients_count_one ?? 'patient')
            : (dashboardTranslations?.patients_count_other ?? 'patients');
    const searchPlaceholder =
        dashboardTranslations?.patients_search_placeholder ??
        'Search patients...';
    const searchAriaLabel =
        dashboardTranslations?.patients_search_aria_label ?? 'Search patients';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title,
            href: '/patients',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={title} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="text-xl font-semibold">{title}</h1>
                            <p className="mt-1 text-sm text-muted-foreground">
                                {filteredPatients.length} {patientCountLabel}
                            </p>
                        </div>

                        <Button asChild>
                            <Link href="/patients/create">
                                {dashboardTranslations?.patients_new_button ??
                                    'New patient'}
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-4 max-w-md">
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder={searchPlaceholder}
                            aria-label={searchAriaLabel}
                        />
                    </div>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    {filteredPatients.length === 0 ? (
                        <p className="p-6 text-sm text-muted-foreground">
                            No matching patients found.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[720px] text-left text-sm">
                                <thead className="border-b border-sidebar-border/70 text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.patients_col_id ??
                                                'ID'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.patients_col_fullname ??
                                                'Full name'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.patients_col_email ??
                                                'Email'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.patients_col_phone ??
                                                'Phone'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.patients_col_age ??
                                                'Age'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.patients_col_gender ??
                                                'Gender'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPatients.map((patient) => (
                                        <tr
                                            key={patient.id}
                                            className="border-b border-sidebar-border/50 last:border-b-0"
                                        >
                                            <td className="px-4 py-3">
                                                {patient.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {patient.fullname}
                                            </td>
                                            <td className="px-4 py-3">
                                                {patient.email}
                                            </td>
                                            <td className="px-4 py-3">
                                                {patient.phone ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {patient.age ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {patient.gender ?? '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

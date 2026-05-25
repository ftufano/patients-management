import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface AppointmentListItem {
    id: string;
    clinic_history_id: string;
    patient_id: string | null;
    patient_name: string | null;
    date: string | null;
    reason: string | null;
    current_illness: string | null;
    diagnosis: string | null;
    discharge_date: string | null;
    discharge_summary: string | null;
    discharge_reason: string | null;
}

export default function Appointments() {
    const { dashboardTranslations, appointments, locale } = usePage<
        SharedData & { appointments: AppointmentListItem[] }
    >().props;
    const [search, setSearch] = useState('');

    const title = dashboardTranslations?.appointments ?? 'Appointments';

    const filteredAppointments = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) {
            return appointments;
        }

        return appointments.filter((appointment) => {
            const rowText = [
                appointment.id,
                appointment.clinic_history_id,
                appointment.patient_id,
                appointment.patient_name,
                appointment.date,
                appointment.reason,
                appointment.current_illness,
                appointment.diagnosis,
                appointment.discharge_date,
                appointment.discharge_summary,
                appointment.discharge_reason,
            ]
                .filter((value) => value !== null && value !== undefined)
                .join(' ')
                .toLowerCase();

            return rowText.includes(term);
        });
    }, [appointments, search]);

    const appointmentCountLabel =
        filteredAppointments.length === 1
            ? (dashboardTranslations?.appointments_count_one ?? 'appointment')
            : (dashboardTranslations?.appointments_count_other ??
              'appointments');
    const searchPlaceholder =
        dashboardTranslations?.appointments_search_placeholder ??
        'Search appointments...';
    const searchAriaLabel =
        dashboardTranslations?.appointments_search_aria_label ??
        'Search appointments';
    const activeLocale = locale ?? document.documentElement.lang ?? 'en';

    const formatAppointmentDate = (value: string | null) => {
        if (!value) {
            return '-';
        }

        const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);

        if (!match) {
            return value;
        }

        const year = Number(match[1]);
        const month = Number(match[2]);
        const day = Number(match[3]);
        const parsedDate = new Date(Date.UTC(year, month - 1, day));

        return new Intl.DateTimeFormat(activeLocale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            timeZone: 'UTC',
        }).format(parsedDate);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title,
            href: '/appointments',
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
                                {filteredAppointments.length}{' '}
                                {appointmentCountLabel}
                            </p>
                        </div>

                        <Button asChild>
                            <Link href="/appointments/create">
                                {dashboardTranslations?.appointments_new_button ??
                                    'New appointment'}
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
                    {filteredAppointments.length === 0 ? (
                        <p className="p-6 text-sm text-muted-foreground">
                            {dashboardTranslations?.appointments_no_matches ??
                                'No matching appointments found.'}
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1120px] text-left text-sm">
                                <thead className="border-b border-sidebar-border/70 text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.appointments_col_patient_id ??
                                                'Patient ID'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.appointments_col_history_id ??
                                                'History ID'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.appointments_col_patient_name ??
                                                'Patient name'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.appointments_col_date ??
                                                'Date'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.appointments_col_reason ??
                                                'Reason'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.appointments_col_current_illness ??
                                                'Current illness'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.appointments_col_diagnosis ??
                                                'Diagnosis'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.appointments_col_discharge_date ??
                                                'Discharge date'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.appointments_col_discharge_summary ??
                                                'Discharge summary'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.appointments_col_discharge_reason ??
                                                'Discharge reason'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments.map((appointment) => (
                                        <tr
                                            key={appointment.id}
                                            className="border-b border-sidebar-border/50 last:border-b-0"
                                        >
                                            <td className="px-4 py-3">
                                                {appointment.patient_id ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {appointment.clinic_history_id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {appointment.patient_name ??
                                                    '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {formatAppointmentDate(
                                                    appointment.date,
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {appointment.reason ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {appointment.current_illness ??
                                                    '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {appointment.diagnosis ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {formatAppointmentDate(
                                                    appointment.discharge_date,
                                                )}
                                            </td>
                                            <td className="px-4 py-3">
                                                {appointment.discharge_summary ??
                                                    '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {appointment.discharge_reason ??
                                                    '-'}
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

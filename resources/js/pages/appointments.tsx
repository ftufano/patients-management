import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface AppointmentListItem {
    id: string;
    date: string | null;
    reason: string | null;
    current_illness: string | null;
    diagnosis: string | null;
    discharge_summary: string | null;
    discharge_reason: string | null;
    clinic_history_id: string;
}

export default function Appointments() {
    const { dashboardTranslations, appointments } = usePage<
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
                appointment.date,
                appointment.reason,
                appointment.current_illness,
                appointment.diagnosis,
                appointment.discharge_summary,
                appointment.discharge_reason,
                appointment.clinic_history_id,
            ]
                .filter((value) => value !== null && value !== undefined)
                .join(' ')
                .toLowerCase();

            return rowText.includes(term);
        });
    }, [appointments, search]);

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
                    <h1 className="text-xl font-semibold">{title}</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {filteredAppointments.length} appointment
                        {filteredAppointments.length === 1 ? '' : 's'}
                    </p>
                    <div className="mt-4 max-w-md">
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search appointments..."
                            aria-label="Search appointments"
                        />
                    </div>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    {filteredAppointments.length === 0 ? (
                        <p className="p-6 text-sm text-muted-foreground">
                            No matching appointments found.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1120px] text-left text-sm">
                                <thead className="border-b border-sidebar-border/70 text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">
                                            ID
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            Date
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            Reason
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            Current illness
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            Diagnosis
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            Discharge summary
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            Discharge reason
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            Clinic history ID
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
                                                {appointment.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {appointment.date ?? '-'}
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
                                                {appointment.discharge_summary ??
                                                    '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {appointment.discharge_reason ??
                                                    '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {appointment.clinic_history_id}
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

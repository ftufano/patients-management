import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface ClinicHistoryListItem {
    id: string;
    patient_id: string;
    patient?: {
        id: string;
        fullname: string;
    } | null;
    mother_history: string | null;
    father_history: string | null;
    brothers_history: string | null;
    sons_history: string | null;
    alergies: string | null;
}

export default function Histories() {
    const { dashboardTranslations, clinicHistories } = usePage<
        SharedData & { clinicHistories: ClinicHistoryListItem[] }
    >().props;
    const [search, setSearch] = useState('');

    const title = dashboardTranslations?.histories ?? 'Histories';

    const filteredHistories = useMemo(() => {
        const term = search.trim().toLowerCase();

        if (!term) {
            return clinicHistories;
        }

        return clinicHistories.filter((history) => {
            const rowText = [
                history.id,
                history.patient_id,
                history.patient?.fullname,
                history.mother_history,
                history.father_history,
                history.brothers_history,
                history.sons_history,
                history.alergies,
            ]
                .filter((value) => value !== null && value !== undefined)
                .join(' ')
                .toLowerCase();

            return rowText.includes(term);
        });
    }, [clinicHistories, search]);

    const historyCountLabel =
        filteredHistories.length === 1
            ? (dashboardTranslations?.histories_count_one ?? 'history')
            : (dashboardTranslations?.histories_count_other ?? 'histories');
    const searchPlaceholder =
        dashboardTranslations?.histories_search_placeholder ??
        'Search histories...';
    const searchAriaLabel =
        dashboardTranslations?.histories_search_aria_label ??
        'Search histories';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title,
            href: '/histories',
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
                                {filteredHistories.length} {historyCountLabel}
                            </p>
                        </div>

                        <Button asChild>
                            <Link href="/histories/create">
                                {dashboardTranslations?.histories_new_button ??
                                    'New history'}
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
                    {filteredHistories.length === 0 ? (
                        <p className="p-6 text-sm text-muted-foreground">
                            {dashboardTranslations?.histories_no_matches ??
                                'No matching histories found.'}
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[980px] text-left text-sm">
                                <thead className="border-b border-sidebar-border/70 text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.histories_col_history ??
                                                'History'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.histories_col_id ??
                                                'ID'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.histories_col_patient_name ??
                                                'Patient name'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.histories_col_mother_history ??
                                                'Mother history'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.histories_col_father_history ??
                                                'Father history'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.histories_col_brothers_history ??
                                                'Brothers history'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.histories_col_sons_history ??
                                                'Sons history'}
                                        </th>
                                        <th className="px-4 py-3 font-medium">
                                            {dashboardTranslations?.histories_col_alergies ??
                                                'Alergies'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredHistories.map((history) => (
                                        <tr
                                            key={history.id}
                                            className="border-b border-sidebar-border/50 last:border-b-0"
                                        >
                                            <td className="px-4 py-3">
                                                {history.id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {history.patient_id}
                                            </td>
                                            <td className="px-4 py-3">
                                                {history.patient?.fullname ??
                                                    '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {history.mother_history ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {history.father_history ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {history.brothers_history ??
                                                    '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {history.sons_history ?? '-'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {history.alergies ?? '-'}
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

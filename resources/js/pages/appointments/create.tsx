import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

type VerificationStatus =
    | 'idle'
    | 'valid'
    | 'not_found'
    | 'no_history'
    | 'error';

export default function CreateAppointment() {
    const { dashboardTranslations } = usePage<SharedData>().props;
    const [patientId, setPatientId] = useState('');
    const [clinicHistoryId, setClinicHistoryId] = useState('');
    const [patientClientError, setPatientClientError] = useState('');
    const [verificationStatus, setVerificationStatus] =
        useState<VerificationStatus>('idle');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [isVerifyingPatient, setIsVerifyingPatient] = useState(false);

    const listTitle = dashboardTranslations?.appointments ?? 'Appointments';
    const title =
        dashboardTranslations?.appointments_create_title ?? 'New appointment';
    const description =
        dashboardTranslations?.appointments_create_description ??
        'Create an appointment for a patient with an existing clinic history.';
    const backToAppointmentsLabel =
        dashboardTranslations?.appointments_create_back ??
        'Back to appointments';
    const patientLabel =
        dashboardTranslations?.appointments_create_field_patient_id ??
        'Patient ID';
    const patientPlaceholder =
        dashboardTranslations?.appointments_create_patient_placeholder ??
        'V7907552';
    const patientRequiredLabel =
        dashboardTranslations?.appointments_create_patient_required ??
        'Please type and verify a patient ID.';
    const verifyPatientLabel =
        dashboardTranslations?.appointments_create_verify_patient ??
        'Verify patient';
    const patientHistoryLabelTemplate =
        dashboardTranslations?.appointments_create_patient_valid ??
        'Patient History: :id';
    const patientNotFoundLabel =
        dashboardTranslations?.appointments_create_patient_not_found ??
        'Patient not found.';
    const patientNoHistoryLabel =
        dashboardTranslations?.appointments_create_patient_no_history ??
        'Patient does not have a clinic history yet.';
    const patientVerifyErrorLabel =
        dashboardTranslations?.appointments_create_patient_verify_error ??
        'Unable to verify patient right now.';

    const reasonLabel =
        dashboardTranslations?.appointments_create_field_reason ?? 'Reason';
    const currentIllnessLabel =
        dashboardTranslations?.appointments_create_field_current_illness ??
        'Current illness';
    const diagnosisLabel =
        dashboardTranslations?.appointments_create_field_diagnosis ??
        'Diagnosis';
    const dischargeDateLabel =
        dashboardTranslations?.appointments_create_field_discharge_date ??
        'Discharge date';
    const dischargeSummaryLabel =
        dashboardTranslations?.appointments_create_field_discharge_summary ??
        'Discharge summary';
    const dischargeReasonLabel =
        dashboardTranslations?.appointments_create_field_discharge_reason ??
        'Discharge reason';

    const cancelLabel =
        dashboardTranslations?.appointments_create_cancel ?? 'Cancel';
    const submitLabel =
        dashboardTranslations?.appointments_create_submit ??
        'Create appointment';

    const isFormEnabled = verificationStatus === 'valid' && !!clinicHistoryId;

    const verifyPatient = async () => {
        const trimmedPatientId = patientId.trim();

        if (!trimmedPatientId) {
            setVerificationStatus('idle');
            setVerificationMessage('');
            setClinicHistoryId('');
            setPatientClientError(patientRequiredLabel);
            return;
        }

        setPatientClientError('');
        setIsVerifyingPatient(true);

        try {
            const response = await fetch(
                `/appointments/verify-patient?patient_id=${encodeURIComponent(trimmedPatientId)}`,
                {
                    headers: {
                        Accept: 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                },
            );

            if (!response.ok) {
                setVerificationStatus('error');
                setVerificationMessage(patientVerifyErrorLabel);
                setClinicHistoryId('');
                return;
            }

            const data = (await response.json()) as {
                exists: boolean;
                has_history: boolean;
                clinic_history_id?: string;
            };

            if (!data.exists) {
                setVerificationStatus('not_found');
                setVerificationMessage(patientNotFoundLabel);
                setClinicHistoryId('');
                return;
            }

            if (!data.has_history || !data.clinic_history_id) {
                setVerificationStatus('no_history');
                setVerificationMessage(patientNoHistoryLabel);
                setClinicHistoryId('');
                return;
            }

            setVerificationStatus('valid');
            setVerificationMessage(
                patientHistoryLabelTemplate.replace(
                    ':id',
                    data.clinic_history_id,
                ),
            );
            setClinicHistoryId(data.clinic_history_id);
        } catch {
            setVerificationStatus('error');
            setVerificationMessage(patientVerifyErrorLabel);
            setClinicHistoryId('');
        } finally {
            setIsVerifyingPatient(false);
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: listTitle,
            href: '/appointments',
        },
        {
            title,
            href: '/appointments/create',
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
                            <Link href="/appointments">
                                {backToAppointmentsLabel}
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <Form
                        action="/appointments"
                        method="post"
                        disableWhileProcessing
                        className="grid gap-6"
                        onSubmitCapture={(event) => {
                            if (
                                patientId.trim() &&
                                verificationStatus === 'valid' &&
                                clinicHistoryId
                            ) {
                                setPatientClientError('');
                                return;
                            }

                            event.preventDefault();
                            setPatientClientError(patientRequiredLabel);
                        }}
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="patient_id">
                                        {patientLabel}
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="patient_id"
                                            name="patient_id"
                                            type="text"
                                            autoComplete="off"
                                            autoCorrect="off"
                                            autoCapitalize="off"
                                            spellCheck={false}
                                            required
                                            placeholder={patientPlaceholder}
                                            value={patientId}
                                            onChange={(event) => {
                                                setPatientId(
                                                    event.target.value,
                                                );
                                                setClinicHistoryId('');
                                                setPatientClientError('');
                                                setVerificationStatus('idle');
                                                setVerificationMessage('');
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={verifyPatient}
                                            disabled={isVerifyingPatient}
                                        >
                                            {isVerifyingPatient && (
                                                <Spinner className="mr-2 h-4 w-4" />
                                            )}
                                            {verifyPatientLabel}
                                        </Button>
                                    </div>

                                    {verificationMessage && (
                                        <p
                                            className={`text-sm ${
                                                verificationStatus === 'valid'
                                                    ? 'text-green-600'
                                                    : 'text-destructive'
                                            }`}
                                        >
                                            {verificationMessage}
                                        </p>
                                    )}

                                    <InputError
                                        message={
                                            patientClientError ||
                                            errors.patient_id ||
                                            errors.clinic_history_id
                                        }
                                    />
                                </div>

                                <Input
                                    type="hidden"
                                    name="clinic_history_id"
                                    value={clinicHistoryId}
                                />

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="reason">
                                            {reasonLabel}
                                        </Label>
                                        <Input
                                            id="reason"
                                            name="reason"
                                            disabled={!isFormEnabled}
                                            required
                                            maxLength={255}
                                            placeholder="Dolor de muela"
                                        />
                                        <InputError message={errors.reason} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="current_illness">
                                            {currentIllnessLabel}
                                        </Label>
                                        <Input
                                            id="current_illness"
                                            name="current_illness"
                                            disabled={!isFormEnabled}
                                            required
                                            maxLength={255}
                                            placeholder="Cariado de molar"
                                        />
                                        <InputError
                                            message={errors.current_illness}
                                        />
                                    </div>

                                    <div className="grid gap-2 md:col-span-2">
                                        <Label htmlFor="diagnosis">
                                            {diagnosisLabel}
                                        </Label>
                                        <Textarea
                                            id="diagnosis"
                                            name="diagnosis"
                                            disabled={!isFormEnabled}
                                            required
                                            maxLength={255}
                                            rows={3}
                                            placeholder="Se denota careo en el molar izquierdo con avanzado recorrido"
                                        />
                                        <InputError
                                            message={errors.diagnosis}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="discharge_date">
                                            {dischargeDateLabel}
                                        </Label>
                                        <Input
                                            id="discharge_date"
                                            name="discharge_date"
                                            type="date"
                                            disabled={!isFormEnabled}
                                            required
                                        />
                                        <InputError
                                            message={errors.discharge_date}
                                        />
                                    </div>

                                    <div className="grid gap-2 md:col-span-2">
                                        <Label htmlFor="discharge_summary">
                                            {dischargeSummaryLabel}
                                        </Label>
                                        <Textarea
                                            id="discharge_summary"
                                            name="discharge_summary"
                                            disabled={!isFormEnabled}
                                            required
                                            maxLength={255}
                                            rows={3}
                                            placeholder="Se hizo limpieza de carie y se relleno con amalgama"
                                        />
                                        <InputError
                                            message={errors.discharge_summary}
                                        />
                                    </div>

                                    <div className="grid gap-2 md:col-span-2">
                                        <Label htmlFor="discharge_reason">
                                            {dischargeReasonLabel}
                                        </Label>
                                        <Textarea
                                            id="discharge_reason"
                                            name="discharge_reason"
                                            disabled={!isFormEnabled}
                                            required
                                            maxLength={45}
                                            rows={2}
                                            placeholder="Se completo el tratamiento propuesto"
                                        />
                                        <InputError
                                            message={errors.discharge_reason}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        asChild
                                    >
                                        <Link href="/appointments">
                                            {cancelLabel}
                                        </Link>
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing || !isFormEnabled}
                                    >
                                        {processing && (
                                            <Spinner className="mr-2 h-4 w-4" />
                                        )}
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

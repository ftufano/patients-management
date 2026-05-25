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
    | 'has_history'
    | 'error';

export default function CreateHistory() {
    const { dashboardTranslations } = usePage<SharedData>().props;
    const [patientId, setPatientId] = useState('');
    const [patientClientError, setPatientClientError] = useState('');
    const [verificationStatus, setVerificationStatus] =
        useState<VerificationStatus>('idle');
    const [verificationMessage, setVerificationMessage] = useState('');
    const [isVerifyingPatient, setIsVerifyingPatient] = useState(false);

    const listTitle = dashboardTranslations?.histories ?? 'Histories';
    const title =
        dashboardTranslations?.histories_create_title ?? 'New history';
    const description =
        dashboardTranslations?.histories_create_description ??
        'Create a clinical history for an existing patient.';
    const backToHistoriesLabel =
        dashboardTranslations?.histories_create_back ?? 'Back to histories';
    const patientLabel =
        dashboardTranslations?.histories_create_field_patient_id ??
        'Patient ID';
    const patientPlaceholder =
        dashboardTranslations?.histories_create_patient_placeholder ??
        'V7907552';
    const patientRequiredLabel =
        dashboardTranslations?.histories_create_patient_required ??
        'Please type and verify a patient ID.';
    const verifyPatientLabel =
        dashboardTranslations?.histories_create_verify_patient ??
        'Verify patient';
    const patientValidLabel =
        dashboardTranslations?.histories_create_patient_valid ??
        'Patient exists and does not have history yet.';
    const patientNotFoundLabel =
        dashboardTranslations?.histories_create_patient_not_found ??
        'Patient not found.';
    const patientHasHistoryLabel =
        dashboardTranslations?.histories_create_patient_has_history ??
        'Patient already has a clinic history.';
    const patientVerifyErrorLabel =
        dashboardTranslations?.histories_create_patient_verify_error ??
        'Unable to verify patient right now.';

    const fieldMotherHistoryLabel =
        dashboardTranslations?.histories_create_field_mother_history ??
        'Mother history';
    const fieldFatherHistoryLabel =
        dashboardTranslations?.histories_create_field_father_history ??
        'Father history';
    const fieldBrothersHistoryLabel =
        dashboardTranslations?.histories_create_field_brothers_history ??
        'Brothers history';
    const fieldSonsHistoryLabel =
        dashboardTranslations?.histories_create_field_sons_history ??
        'Sons history';
    const fieldAlergiesLabel =
        dashboardTranslations?.histories_create_field_alergies ?? 'Alergies';
    const fieldPsychobiologicalHistoryLabel =
        dashboardTranslations?.histories_create_field_psychobiological_history ??
        'Psychobiological history';
    const fieldFunctionalTestLabel =
        dashboardTranslations?.histories_create_field_functional_test ??
        'Functional test';
    const fieldPhysicTestLabel =
        dashboardTranslations?.histories_create_field_physic_test ??
        'Physic test';

    const cancelLabel =
        dashboardTranslations?.histories_create_cancel ?? 'Cancel';
    const submitLabel =
        dashboardTranslations?.histories_create_submit ?? 'Create history';
    const isFormEnabled = verificationStatus === 'valid';

    const verifyPatient = async () => {
        if (!patientId.trim()) {
            setVerificationStatus('idle');
            setVerificationMessage('');
            setPatientClientError(patientRequiredLabel);
            return;
        }

        setPatientClientError('');
        setIsVerifyingPatient(true);

        try {
            const response = await fetch(
                `/histories/verify-patient?patient_id=${encodeURIComponent(patientId.trim())}`,
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
                return;
            }

            const data = (await response.json()) as {
                exists: boolean;
                has_history: boolean;
            };

            if (!data.exists) {
                setVerificationStatus('not_found');
                setVerificationMessage(patientNotFoundLabel);
                return;
            }

            if (data.has_history) {
                setVerificationStatus('has_history');
                setVerificationMessage(patientHasHistoryLabel);
                return;
            }

            setVerificationStatus('valid');
            setVerificationMessage(patientValidLabel);
        } catch {
            setVerificationStatus('error');
            setVerificationMessage(patientVerifyErrorLabel);
        } finally {
            setIsVerifyingPatient(false);
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: listTitle,
            href: '/histories',
        },
        {
            title,
            href: '/histories/create',
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
                            <Link href="/histories">
                                {backToHistoriesLabel}
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border">
                    <Form
                        action="/histories"
                        method="post"
                        disableWhileProcessing
                        className="grid gap-6"
                        onSubmitCapture={(event) => {
                            if (
                                patientId.trim() &&
                                verificationStatus === 'valid'
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
                                            className="w-full sm:w-64"
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
                                            errors.patient_id
                                        }
                                    />
                                </div>

                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="grid gap-2">
                                        <Label htmlFor="mother_history">
                                            {fieldMotherHistoryLabel}
                                        </Label>
                                        <Textarea
                                            id="mother_history"
                                            name="mother_history"
                                            disabled={!isFormEnabled}
                                            required
                                            maxLength={250}
                                            rows={3}
                                            placeholder="Madre sana"
                                        />
                                        <InputError
                                            message={errors.mother_history}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="father_history">
                                            {fieldFatherHistoryLabel}
                                        </Label>
                                        <Textarea
                                            id="father_history"
                                            name="father_history"
                                            disabled={!isFormEnabled}
                                            required
                                            maxLength={250}
                                            rows={3}
                                            placeholder="Padre con antecedentes de diabetes"
                                        />
                                        <InputError
                                            message={errors.father_history}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="brothers_history">
                                            {fieldBrothersHistoryLabel}
                                        </Label>
                                        <Textarea
                                            id="brothers_history"
                                            name="brothers_history"
                                            disabled={!isFormEnabled}
                                            required
                                            maxLength={250}
                                            rows={3}
                                            placeholder="Hermano sano. Hermana sana"
                                        />
                                        <InputError
                                            message={errors.brothers_history}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="sons_history">
                                            {fieldSonsHistoryLabel}
                                        </Label>
                                        <Textarea
                                            id="sons_history"
                                            name="sons_history"
                                            disabled={!isFormEnabled}
                                            required
                                            maxLength={250}
                                            rows={3}
                                            placeholder="Hijo sano"
                                        />
                                        <InputError
                                            message={errors.sons_history}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="alergies">
                                            {fieldAlergiesLabel}
                                        </Label>
                                        <Textarea
                                            id="alergies"
                                            name="alergies"
                                            disabled={!isFormEnabled}
                                            required
                                            maxLength={250}
                                            rows={3}
                                            placeholder="Frutos del mar"
                                        />
                                        <InputError message={errors.alergies} />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="psychobiological_history">
                                            {fieldPsychobiologicalHistoryLabel}
                                        </Label>
                                        <Textarea
                                            id="psychobiological_history"
                                            name="psychobiological_history"
                                            disabled={!isFormEnabled}
                                            required
                                            maxLength={250}
                                            rows={3}
                                            placeholder="Tabaco: niega, Alcohol: Ocasional, IPA: No Aplica"
                                        />
                                        <InputError
                                            message={
                                                errors.psychobiological_history
                                            }
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="functional_test">
                                            {fieldFunctionalTestLabel}
                                        </Label>
                                        <Textarea
                                            id="functional_test"
                                            name="functional_test"
                                            disabled={!isFormEnabled}
                                            required
                                            maxLength={250}
                                            rows={3}
                                            placeholder="General: refiere sentirse bien..."
                                        />
                                        <InputError
                                            message={errors.functional_test}
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="physic_test">
                                            {fieldPhysicTestLabel}
                                        </Label>
                                        <Textarea
                                            id="physic_test"
                                            name="physic_test"
                                            disabled={!isFormEnabled}
                                            required
                                            maxLength={250}
                                            rows={3}
                                            placeholder="Condiciones generales optimas, facie asimetricas"
                                        />
                                        <InputError
                                            message={errors.physic_test}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        asChild
                                    >
                                        <Link href="/histories">
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

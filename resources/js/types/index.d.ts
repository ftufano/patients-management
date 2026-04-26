import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    appTitle?: string;
    dashboardLabel?: string;
    dashboardTranslations?: {
        dashboard?: string;
        patients?: string;
        patients_count_one?: string;
        patients_count_other?: string;
        patients_search_placeholder?: string;
        patients_search_aria_label?: string;
        patients_new_button?: string;
        patients_col_id?: string;
        patients_col_fullname?: string;
        patients_col_email?: string;
        patients_col_phone?: string;
        patients_col_age?: string;
        patients_col_gender?: string;
        patients_create_title?: string;
        patients_create_description?: string;
        patients_create_back?: string;
        patients_create_gender_required?: string;
        patients_create_country_search_placeholder?: string;
        patients_create_country_search_empty?: string;
        patients_create_field_id?: string;
        patients_create_field_fullname?: string;
        patients_create_field_email?: string;
        patients_create_field_phone?: string;
        patients_create_field_age?: string;
        patients_create_field_gender?: string;
        patients_create_field_birthdate?: string;
        patients_create_field_birthplace?: string;
        patients_create_field_address?: string;
        patients_create_gender_placeholder?: string;
        patients_create_gender_male?: string;
        patients_create_gender_female?: string;
        patients_create_cancel?: string;
        patients_create_submit?: string;
        patients_create_birthdate_title?: string;
        histories?: string;
        histories_count_one?: string;
        histories_count_other?: string;
        histories_search_placeholder?: string;
        histories_search_aria_label?: string;
        histories_new_button?: string;
        histories_create_title?: string;
        histories_create_description?: string;
        histories_create_back?: string;
        histories_create_field_patient_id?: string;
        histories_create_patient_placeholder?: string;
        histories_create_patient_required?: string;
        histories_create_verify_patient?: string;
        histories_create_patient_valid?: string;
        histories_create_patient_not_found?: string;
        histories_create_patient_has_history?: string;
        histories_create_patient_verify_error?: string;
        histories_create_no_patients?: string;
        histories_create_field_mother_history?: string;
        histories_create_field_father_history?: string;
        histories_create_field_brothers_history?: string;
        histories_create_field_sons_history?: string;
        histories_create_field_alergies?: string;
        histories_create_field_psychobiological_history?: string;
        histories_create_field_functional_test?: string;
        histories_create_field_physic_test?: string;
        histories_create_cancel?: string;
        histories_create_submit?: string;
        appointments?: string;
        appointments_count_one?: string;
        appointments_count_other?: string;
        appointments_search_placeholder?: string;
        appointments_search_aria_label?: string;
        platform?: string;
        repository?: string;
        documentation?: string;
        settings?: string;
        logout?: string;
        navigation_menu?: string;
    };
    settingsTranslations?: {
        layout?: {
            title?: string;
            description?: string;
            profile?: string;
            password?: string;
            two_factor?: string;
            appearance?: string;
        };
        profile?: {
            breadcrumb?: string;
            page_title?: string;
            section_title?: string;
            section_description?: string;
            fullname_label?: string;
            fullname_placeholder?: string;
            email_label?: string;
            email_placeholder?: string;
            email_unverified?: string;
            resend_verification?: string;
            verification_sent?: string;
            save?: string;
            saved?: string;
        };
        password?: {
            breadcrumb?: string;
            page_title?: string;
            section_title?: string;
            section_description?: string;
            current_password_label?: string;
            current_password_placeholder?: string;
            new_password_label?: string;
            new_password_placeholder?: string;
            confirm_password_label?: string;
            confirm_password_placeholder?: string;
            save_button?: string;
            saved?: string;
        };
        two_factor?: {
            breadcrumb?: string;
            page_title?: string;
            section_title?: string;
            section_description?: string;
            enabled_badge?: string;
            disabled_badge?: string;
            enabled_description?: string;
            disabled_description?: string;
            disable_button?: string;
            continue_setup_button?: string;
            enable_button?: string;
            recovery_title?: string;
            recovery_description?: string;
            hide_recovery?: string;
            view_recovery?: string;
            regenerate_recovery?: string;
            recovery_aria_label?: string;
            recovery_loading_label?: string;
            recovery_notice?: string;
            manual_code_hint?: string;
            back_button?: string;
            confirm_button?: string;
            modal_enabled_title?: string;
            modal_enabled_description?: string;
            modal_verify_title?: string;
            modal_verify_description?: string;
            modal_enable_title?: string;
            modal_enable_description?: string;
            modal_continue?: string;
            modal_close?: string;
        };
        appearance?: {
            breadcrumb?: string;
            page_title?: string;
            section_title?: string;
            section_description?: string;
            light?: string;
            dark?: string;
            system?: string;
        };
        delete_account?: {
            title?: string;
            description?: string;
            warning_title?: string;
            warning_description?: string;
            trigger_button?: string;
            dialog_title?: string;
            dialog_description?: string;
            password_label?: string;
            password_placeholder?: string;
            cancel?: string;
            confirm_button?: string;
        };
    };
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: string;
    fullname: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

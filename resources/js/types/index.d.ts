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

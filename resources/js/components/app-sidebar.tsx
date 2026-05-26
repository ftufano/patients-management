import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Calendar, FileText, LayoutGrid, Users } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { dashboardLabel, dashboardTranslations } =
        usePage<SharedData>().props;

    const mainNavItems: NavItem[] = [
        {
            title:
                dashboardTranslations?.dashboard ??
                dashboardLabel ??
                'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: dashboardTranslations?.patients ?? 'Patients',
            href: '/patients',
            icon: Users,
        },
        {
            title: dashboardTranslations?.histories ?? 'Histories',
            href: '/histories',
            icon: FileText,
        },
        {
            title: dashboardTranslations?.appointments ?? 'Appointments',
            href: '/appointments',
            icon: Calendar,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

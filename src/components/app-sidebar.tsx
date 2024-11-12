import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from '../components/ui/sidebar';
import {NavUser} from '../components/nav-user';
import {Link} from 'react-router-dom';
import {APP_NAME, SIDE_BAR_MENU} from '../constants/app.config';
import {useAuth} from '../hooks/useAuth';

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
  const {user} = useAuth();

  return (
    <Sidebar {...props}>
      <SidebarHeader className='text-2xl flex'>
        <img src='/favicon.ico' alt='Ark Store Company' width='40px' height='40px' className='ml-16' />
        <span className='hover:text-rose-800 ml-2'>{APP_NAME}</span>
      </SidebarHeader>

      <SidebarContent className='gap-0'>
        {SIDE_BAR_MENU.navMain.map((item) => {
          if (item.role.includes(user?.role ?? '')) {
            return (
              <SidebarGroup key={item.title}>
                <SidebarGroupLabel className='text-base font-bold'>{item.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => {
                      return (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            className='group/label text-sm text-sidebar-foreground 
													bg-sidebar-accent hover:bg-slate-600 hover:text-neutral-100'
                          >
                            <Link to={item.url}>{item.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            );
          }
          return false;
        })}
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: user?.role.toUpperCase() ?? '',
            email: 'ark.store',
            avatar: '/favicon.ico',
          }}
        />
        <div className='py-1' />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

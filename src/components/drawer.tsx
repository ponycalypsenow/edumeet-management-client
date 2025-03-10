import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import Table, { Room } from './table';
import RoomTable from './room/room';
import TenantPage from './tenant/tenant/tenant';
import { BrowserRouter as Router, Route, Link, useParams, Routes } from 'react-router-dom';
import LoginLayout from './test/test';
import PersonIcon from '@mui/icons-material/Person';
import io from 'socket.io-client';
import { feathers } from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import authentication from '@feathersjs/authentication-client';
import edumeetConfig from '../utils/edumeetConfig';
import UserTable from './user/user';
import GroupTable from './groups/groups';
import RoleTable from './roles/roles';
import PermissionTable from './permission_stuff/permissions';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';

const drawerWidth = 300;

interface Props {
	username: string;
}

export default function ResponsiveDrawer(props: Props) {
	const { username } = props;
	const [ mobileOpen, setMobileOpen ] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const drawer = (
		<div>
			{/* <Toolbar /> */}

			<List>
				<ListItem style={{ justifyContent: 'center' }} >
					<img src='https://raw.githubusercontent.com/edumeet/edumeet/master/app/public/images/logo.edumeet.svg' />
				</ListItem>
			
				<ListItem key={'{username}'} disablePadding >

					<ListItemButton>
						<ListItemIcon>
							<PersonOutlineIcon/>
						</ListItemIcon>
						<ListItemText primary={`${username}`} />
					</ListItemButton>
				</ListItem>
				<ListItem key={'Logout'} disablePadding onClick={
					async () => {
						const socket = io(edumeetConfig.hostname, { path: edumeetConfig.path });
						// Initialize our Feathers client application through Socket.io
						// with hooks and authentication.
						const client = feathers();

						client.configure(socketio(socket));
						// Use localStorage to store our login token
						client.configure(authentication());

						await client.logout();
						window.location.reload();
					}
				}>
					<ListItemButton>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary={'Logout'} />
					</ListItemButton>
				</ListItem>

			</List>

			<Divider />
			<List>
				<ListItem button component={Link} to={edumeetConfig.clipath} key={'Dashboard'} disablePadding>
					<ListItemButton >
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary={'Dashboard'} />
					</ListItemButton>
				</ListItem>
				<ListItem button component={Link} to={`${edumeetConfig.clipath}tenant`} key={'Tenants'} disablePadding>
					<ListItemButton >
						<ListItemIcon>
							<PeopleOutlineIcon />
						</ListItemIcon>
						<ListItemText primary={'Tenants'} />
					</ListItemButton>
				</ListItem>
				<ListItem button component={Link} to={`${edumeetConfig.clipath}room`} key={'Room(s)'} disablePadding>
					<ListItemButton >
						<ListItemIcon>
							<MeetingRoomIcon />
						</ListItemIcon>
						<ListItemText primary={'Room(s)'} />
					</ListItemButton>
				</ListItem>
				<ListItem button component={Link} to={`${edumeetConfig.clipath}users`} key={'User(s)'} disablePadding>
					<ListItemButton >
						<ListItemIcon>
							<PersonSearchIcon />
						</ListItemIcon>
						<ListItemText primary={'Users'} />
					</ListItemButton>
				</ListItem>
				<ListItem button component={Link} to={`${edumeetConfig.clipath}groups`} key={'Group(s)'} disablePadding>
					<ListItemButton >
						<ListItemIcon>
							<SupervisorAccountIcon />
						</ListItemIcon>
						<ListItemText primary={'Groups'} />
					</ListItemButton>
				</ListItem>
				<ListItem button component={Link} to={`${edumeetConfig.clipath}permissions`} key={'Permissions(s)'} disablePadding>
					<ListItemButton >
						<ListItemIcon>
							<ManageAccountsIcon />
						</ListItemIcon>
						<ListItemText primary={'Permissions'} />
					</ListItemButton>
				</ListItem>
				<ListItem button component={Link} to={`${edumeetConfig.clipath}roles`} key={'Role(s)'} disablePadding>
					<ListItemButton >
						<ListItemIcon>
							<AdminPanelSettingsIcon />
						</ListItemIcon>
						<ListItemText primary={'Role(s)'} />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
			<List>
				{[ 'General', 'Logs', 'About us' ].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>
								{index % 2 === 0 ? <InfoIcon /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</div >
	);

	const Product: React.FC = (): JSX.Element => {
		const params = useParams();

		return <>Link ID parameter === "{params.id}"
			<Link to="/cli/">Homepage</Link>
		</>;
	};

	return (
		<Router>

			<Box sx={{ display: 'flex' }}>
				<CssBaseline />
				<AppBar
					position="fixed"
					sx={{
						width: { sm: `calc(100% - ${drawerWidth}px)` },
						ml: { sm: `${drawerWidth}px` },
					}}
				>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ mr: 2, display: { sm: 'none' } }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap component="div">
							Edumeet management client
						</Typography>
					</Toolbar>
				</AppBar>
				<Box
					component="nav"
					sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
					aria-label="mailbox folders"
				>
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Drawer

						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: 'block', sm: 'none' },
							'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
						}}
					>
						{drawer}
					</Drawer>
					<Drawer
						variant="permanent"
						sx={{
							display: { xs: 'none', sm: 'block' },
							'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
						}}
						open
					>
						{drawer}
					</Drawer>
				</Box>
				<Box
					component="main"
					sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
				>
					<Toolbar />
					<Typography paragraph>
						
					</Typography>
				
					<Routes>

						<Route path="/cli/" Component={LoginLayout} />
						<Route path="/cli/room" Component={RoomTable} />
						<Route path="/cli/tenant" Component={TenantPage} />
						<Route path="/cli/users" Component={UserTable} />
						<Route path="/cli/groups" Component={GroupTable} />
						<Route path="/cli/roles" Component={RoleTable} />
						<Route path="/cli/permissions" Component={PermissionTable} />
						<Route path="/cli/products/:id" Component={Product} />
					</Routes>

				</Box>

			</Box>
		</Router>
	);
}

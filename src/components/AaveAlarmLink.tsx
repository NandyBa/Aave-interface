import { Trans } from '@lingui/macro';
import {
  Button,
  experimental_sx,
  Link,
  Menu,
  MenuItem,
  MenuList,
  Popper,
  Stack,
  styled,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';

import AaveAlarm from '/public/icons/healthFactor/AaveAlarm.svg';
import AaveAlarmHover from '/public/icons/healthFactor/AaveAlarmHover.svg';

const PopperComponent = styled(Popper)(
  experimental_sx({
    '.MuiTooltip-tooltip': {
      color: 'text.primary',
      backgroundColor: 'background.paper',
      p: 0,
      borderRadius: '6px',
      boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
      maxWidth: '300px',
    },
    '.MuiTooltip-arrow': {
      color: 'background.paper',
      '&:before': {
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
      },
    },
  })
);

const SvgIconStyle = {
  fontSize: '14px',
  zIndex: 2,
  position: 'absolute',
  left: 5,
  transition: 'all 0.2s easy',
};

interface Apps {
  iOS: string;
  Android: string;
}

export default function AaveAlarmLink() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const Apps: Apps = {
    iOS: 'https://apps.apple.com/am/app/aave-alarm/id6454900102',
    Android: 'https://play.google.com/store/apps/details?id=com.aavealarm&pcampaignid=web_share',
  };

  const handleMenuItemClick = (key: keyof Apps) => {
    setAnchorEl(null);
    window.open(Apps[key], '_blank');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Tooltip
      arrow
      placement="top"
      PopperComponent={PopperComponent}
      title={
        <Stack sx={{ py: 4, px: 6 }} spacing={1}>
          <Typography variant="tooltip" color="text.secondary" fontWeight={500}>
            <Trans>Setup notifications about your Health Factor using the Aave Alarm app.</Trans>
          </Typography>
          <Typography variant="tooltip" color="text.secondary" fontWeight={500}>
            <Trans>This app was developed thanks to a grant from Aave Grants DAO</Trans>
          </Typography>
        </Stack>
      }
    >
      <>
        <Button
          variant="surface"
          size="small"
          target="_blank"
          rel="noopener"
          component={Link}
          onClick={handleClickListItem}
          sx={{
            pl: 6,
            position: 'relative',
            '&:hover': {
              '.AaveAlarmTooltip__icon': { opacity: 0 },
              '.AaveAlarmTooltip__hoverIcon': { opacity: 1 },
            },
          }}
        >
          <SvgIcon sx={{ opacity: 1, ...SvgIconStyle }} className="AaveAlarmTooltip__icon">
            <AaveAlarm />
          </SvgIcon>
          <SvgIcon sx={{ opacity: 0, ...SvgIconStyle }} className="AaveAlarmTooltip__hoverIcon">
            <AaveAlarmHover />
          </SvgIcon>
          <Trans>Notify</Trans>
        </Button>
        <Menu
          id="aave-alarm-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'lock-button',
            role: 'listbox',
          }}
        >
          <MenuList disablePadding sx={{ '.MuiMenuItem-root.Mui-disabled': { opacity: 1 } }}>
            {Apps &&
              Object.keys(Apps).map((key) => (
                <MenuItem key={key} onClick={() => handleMenuItemClick(key as keyof Apps)}>
                  {key}
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
      </>
    </Tooltip>
  );
}

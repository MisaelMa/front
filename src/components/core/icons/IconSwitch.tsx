import {
  Home,
  Receipt,
  PictureAsPdf,
  Description,
  VpnKey,
} from '@material-ui/icons';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

interface IconSwitchProp {
  icon: string;
}

const IconSwitch = (props: IconSwitchProp) => {
  const { icon } = props;
  switch (icon) {
    case `factura`:
      return <Receipt />;

    case `pdf`:
      return <PictureAsPdf />;
    case `reporte`:
      return <Description />;
    case `key`:
      return <VpnKey />;
    default:
      return <Home />;
  }
};
export default IconSwitch;

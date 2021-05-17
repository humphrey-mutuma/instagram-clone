import Menu from "@material-ui/core/Menu";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import InstaEmbed from "./InstaEmbed";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

export default function MenuPopupState() {
  const insta__modal = {
    margin:'20px'
  }
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <MenuRoundedIcon
            variant="contained"
            color="primary"
            {...bindTrigger(popupState)}
          >
            Open Menu
          </MenuRoundedIcon>
          <Menu {...bindMenu(popupState)}>
            <div style={insta__modal}>
              <InstaEmbed />
            </div>
          </Menu>
        </>
      )}
    </PopupState>
  );
}

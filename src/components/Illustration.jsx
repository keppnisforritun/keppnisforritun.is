/** @jsx jsx */
import { jsx } from "theme-ui";

const Illustration = ({children}) => (
    <div style={{"margin-bottom": "10px", "box-shadow": "0px"}} sx={{"& > img": {"box-shadow": "none"}}}>
        {children}
    </div>
);

export default Illustration;

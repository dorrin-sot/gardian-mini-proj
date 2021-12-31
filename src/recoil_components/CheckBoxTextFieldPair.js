import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilState } from "recoil";
import RequiredTextFieldWithError from "../components/RequiredTextFieldWithError";
import "../App.css";

const CheckBoxTextFieldPair = ({
  id,
  label,
  boolRecoilState,
  countRecoilState,
  onError,
  onNotError,
  customErrors,
}) => {
  const [boolValue, setBoolValue] = useRecoilState(boolRecoilState);

  const handleBoolValueChange = ({ target: { checked: newValue } }) => {
    // remove smoke/vape count textfield errors so submit isnt prohibited
    onNotError(id);

    return setBoolValue(newValue);
  };

  console.log(label, id, boolValue);
  return (
    <Box sx={{ mt: 1.5 }}>
      <FormGroup>
        <FormControlLabel
          control={
            <Box>
              <Checkbox
                label="cdscds"
                checked={boolValue}
                onChange={handleBoolValueChange}
              />
              <RequiredTextFieldWithError
                id={id}
                label={`روزی چند بار ${label} میکشید؟`}
                recoilState={countRecoilState}
                type="number"
                onError={onError}
                onNotError={onNotError}
                customErrors={customErrors}
                disabled={!boolValue}
              />
            </Box>
          }
          label={
            <Typography
              style={{ fontFamily: "Yekan" }}
            >{`آیا ${label} میکشید؟`}</Typography>
          }
          labelPlacement="top"
        />
      </FormGroup>
    </Box>
  );
};

export default CheckBoxTextFieldPair;

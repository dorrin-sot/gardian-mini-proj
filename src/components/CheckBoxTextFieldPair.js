import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useRecoilState } from "recoil";
import RequiredTextFieldWithError from "./RequiredTextFieldWithError";
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
      <Stack direction="column" justifyContent="center" alignItems="center">
        <FormGroup>
          <FormControlLabel
            control={
              <Box>
                <Checkbox
                  label="cdscds"
                  checked={boolValue}
                  onChange={handleBoolValueChange}
                />
              </Box>
            }
            label={
              <Typography
                style={{ fontFamily: "Yekan" }}
              >{`آیا ${label} میکشید؟`}</Typography>
            }
            labelPlacement="end"
          />
        </FormGroup>
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
      </Stack>
    </Box>
  );
};

export default CheckBoxTextFieldPair;

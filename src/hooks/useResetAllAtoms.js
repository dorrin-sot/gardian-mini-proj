import { useResetRecoilState } from "recoil";
import * as Atoms from "../recoil/atoms";

export default function useResetAllAtoms() {
  return [
    useResetRecoilState(Atoms.pagesCompletionState),
    useResetRecoilState(Atoms.firstNameState),
    useResetRecoilState(Atoms.lastNameState),
    useResetRecoilState(Atoms.phoneNumberState),
    useResetRecoilState(Atoms.emailState),
    useResetRecoilState(Atoms.birthdateState),
    useResetRecoilState(Atoms.weightState),
    useResetRecoilState(Atoms.heightState),
    useResetRecoilState(Atoms.agencyState),
    useResetRecoilState(Atoms.doesSmokeState),
    useResetRecoilState(Atoms.smokeCountState),
    useResetRecoilState(Atoms.doesVapeState),
    useResetRecoilState(Atoms.vapeCountState),
    useResetRecoilState(Atoms.sicknessesState),
  ];
}

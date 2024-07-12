"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAlertStore } from "@/zustand/alert.store";

export function AlertUi() {
  const { showAlert, alertTitle, alertMessage, setAlert } = useAlertStore();

  if (!showAlert) return null;

  return (
    <>
      <div
        onClick={() => setAlert(false, "", "")}
        className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 z-50 bg-black opacity-30"
      ></div>
      <Alert className="z-50 bg-slate-50 fixed w-1/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white">
        <AlertTitle className="text-xl font-bold">{alertTitle}</AlertTitle>
        <AlertDescription className="mt-3">{alertMessage}</AlertDescription>
        <AlertDescription className="text-center mt-3">
          <button
            className="bg-main-color p-2 px-3 rounded-md text-white"
            onClick={() => setAlert(false, "", "")}
          >
            확인
          </button>
        </AlertDescription>
      </Alert>
    </>
  );
}

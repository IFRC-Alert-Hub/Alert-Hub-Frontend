import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import FormCheckbox from "./FormCheckbox";
import { useMutation } from "@apollo/client";
import {
  ADD_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
} from "../../../API/mutations/subscriptionMutations";

import { subscription_module } from "../../../API/API_Links";
import CountryAutocomplete from "./CountryAutocomplete";
import { GET_SUBSCRIPTIONS } from "../../../API/ALL_QUERIES";
import {
  CountryOptionsType,
  Admin1OptionsType,
  SubscriptionForm,
} from "../../../API/TYPES";
import Admin1Autocomplete from "./Admin1Autocomplete";
import SentFlagRadio from "./SentFlagRadio";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: "350px",
  maxHeight: "600px",
  overflow: "auto",
  bgcolor: "background.paper",
  boxShadow: 10,
  borderRadius: "5px",
};

const checkBoxList = [
  {
    name: "urgencyArray",
    legend: "Urgency",
    checkboxItems: ["Immediate", "Expected", "Future", "Past", "Unknown"],
  },
  {
    name: "severityArray",
    legend: "Severity",
    checkboxItems: ["Extreme", "Severe", "Moderate", "Minor", "Unknown"],
  },
  {
    name: "certaintyArray",
    legend: "Certainty",
    checkboxItems: ["Observed", "Likely", "Possible", "Unlikely", "Unknown"],
  },
  {
    name: "subscribeBy",
    legend: "Notification Type",
    checkboxItems: ["Email"],
  },
];

type PropsType = {
  modalOpen: boolean;
  handleModalClose: () => void;
  formType: string;
  countryList: CountryOptionsType[];
  selectedRow: SubscriptionForm;
  setSelectedRow: React.Dispatch<React.SetStateAction<SubscriptionForm>>;
};

const ModalForm = ({
  modalOpen,
  handleModalClose,
  formType,
  countryList,
  selectedRow,
  setSelectedRow,
}: PropsType) => {
  const [addSubscription] = useMutation(ADD_SUBSCRIPTION, {
    refetchQueries: [GET_SUBSCRIPTIONS, "FetchSubscriptions"],
    client: subscription_module,
  });
  const [updateSubscription] = useMutation(UPDATE_SUBSCRIPTION, {
    refetchQueries: [GET_SUBSCRIPTIONS, "FetchSubscriptions"],
    client: subscription_module,
  });

  const [verifyForm, setVerifyForm] = useState(false);
  const [admin1List, setAdmin1List] = useState<Admin1OptionsType[] | null>(
    null
  );

  const formErrors = {
    subscriptionName: selectedRow.subscriptionName.length < 1,
    countryIds: selectedRow.countryIds.length < 1,
    admin1Ids: selectedRow.admin1Ids.length < 1,
    urgencyArray: selectedRow.urgencyArray.length < 1,
    severityArray: selectedRow.severityArray.length < 1,
    certaintyArray: selectedRow.certaintyArray.length < 1,
    subscribeBy: selectedRow.subscribeBy.length < 1,
    sentFlag: selectedRow.sentFlag < 0,
  };

  useEffect(() => {
    const filteredCountry = countryList.filter(
      (country) => country.id === selectedRow.countryIds[0]
    );
    console.log(countryList);
    console.log(filteredCountry);
    const admin1List = filteredCountry.flatMap((country) => {
      const { id, name, admin1s } = country;
      return admin1s.map((admin1) => ({
        admin1Id: admin1.id,
        admin1Name: admin1.name,
        countryId: id,
        countryName: name,
      }));
    });
    console.log("admin1List", admin1List);
    setAdmin1List(admin1List);
  }, [countryList, selectedRow.countryIds]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedValues = checked
        ? [...(selectedRow[name] as string[]), value]
        : (selectedRow[name] as string[]).filter(
            (item: string) => item !== value
          );
      setSelectedRow((prevState) => ({
        ...prevState,
        [name]: updatedValues,
      }));
    } else {
      if (value.toString().length <= 50)
        setSelectedRow((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVerifyForm(true);

    // Pass with no errors
    if (!Object.values(formErrors).includes(true)) {
      if (selectedRow.id) {
        updateSubscription({
          variables: {
            subscriptionId: parseInt(selectedRow.id),
            subscriptionName: selectedRow.subscriptionName,
            countryIds: selectedRow.countryIds,
            admin1Ids: selectedRow.admin1Ids,
            urgencyArray: selectedRow.urgencyArray,
            severityArray: selectedRow.severityArray,
            certaintyArray: selectedRow.certaintyArray,
            subscribeBy: selectedRow.subscribeBy,
            sentFlag: selectedRow.sentFlag,
          },
        });
      } else {
        addSubscription({
          variables: {
            subscriptionName: selectedRow.subscriptionName,
            countryIds: selectedRow.countryIds,
            admin1Ids: selectedRow.admin1Ids,
            urgencyArray: selectedRow.urgencyArray,
            severityArray: selectedRow.severityArray,
            certaintyArray: selectedRow.certaintyArray,
            subscribeBy: selectedRow.subscribeBy,
            sentFlag: selectedRow.sentFlag,
          },
        });
      }
      setVerifyForm(false);
      handleModalClose();
    }
  };

  return (
    <>
      {admin1List && (
        <Modal
          open={modalOpen}
          onClose={() => {
            setVerifyForm(false);
            handleModalClose();
          }}
          aria-labelledby="modal-title"
        >
          <Box sx={style}>
            <Box
              sx={{
                textAlign: "center",
                backgroundColor: "#d30210",
                p: 1.5,
                borderRadius: "4px 4px 0 0",
              }}
            >
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ fontSize: "1.2rem", color: "#fff" }}
              >
                {formType} Subscription
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit} p={4}>
              <Box sx={{ mb: 1 }}>
                <InputLabel
                  htmlFor="title"
                  required
                  error={verifyForm && formErrors.subscriptionName}
                  className="subs-form-title"
                >
                  Title
                </InputLabel>
                <TextField
                  id="subscriptionName"
                  name="subscriptionName"
                  size="small"
                  variant="outlined"
                  value={selectedRow.subscriptionName}
                  onChange={handleChange}
                  error={verifyForm && formErrors.subscriptionName}
                  helperText={
                    verifyForm &&
                    formErrors.subscriptionName &&
                    "You need to enter the title"
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {selectedRow.subscriptionName.length | 0}
                        /50
                      </InputAdornment>
                    ),
                  }}
                  sx={{ width: "100%", mt: 1, mb: 1 }}
                />
              </Box>
              <CountryAutocomplete
                verifyForm={verifyForm}
                formErrors={formErrors}
                countryList={countryList}
                selectedRow={selectedRow}
                setSelectedRow={setSelectedRow}
              />

              <Admin1Autocomplete
                verifyForm={verifyForm}
                formErrors={formErrors}
                admin1List={admin1List}
                selectedRow={selectedRow}
                setSelectedRow={setSelectedRow}
              />
              {checkBoxList.map((item) => (
                <FormCheckbox
                  verifyForm={verifyForm}
                  formErrors={formErrors}
                  key={item.name}
                  checkboxTitle={item.name}
                  legend={item.legend}
                  checkboxItems={item.checkboxItems}
                  selectedRow={selectedRow}
                  handleChange={handleChange}
                />
              ))}
              <SentFlagRadio
                verifyForm={verifyForm}
                formErrors={formErrors}
                selectedRow={selectedRow}
                setSelectedRow={setSelectedRow}
              />
              <Box display="flex" justifyContent="flex-end">
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ marginRight: "10px" }}
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="error">
                  Submit
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ModalForm;

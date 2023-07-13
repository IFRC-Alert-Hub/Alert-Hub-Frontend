import {
  Box,
  Button,
  InputAdornment,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FormCheckbox from "./FormCheckbox";
import { useMutation } from "@apollo/client";
import {
  ADD_SUBSCRIPTION,
  UPDATE_SUBSCRIPTION,
} from "../../API/mutations/subscriptionMutation";
import {
  ContinentType,
  CountryType,
  GET_SUBSCRIPTIONS,
  SubscriptionForm,
  SubscriptionItem,
} from "../../API/queries/getSubscriptions";
import { subscription_module } from "../../API/API_Links";
import CountryAutocomplete from "./CountryAutocomplete";

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
  boxShadow: 24,
  p: 4,
  borderRadius: "5px",
};

const checkBoxList = [
  {
    legend: "Urgency",
    checkboxItems: ["Immediate", "Expected", "Future", "Past", "Unknown"],
  },
  {
    legend: "Severity",
    checkboxItems: ["Extreme", "Severe", "Moderate", "Minor", "Unknown"],
  },
  {
    legend: "Certainty",
    checkboxItems: ["Observed", "Likely", "Possible", "Unlikely", "Unknown"],
  },
  {
    legend: "Methods",
    checkboxItems: ["Email", "SMS"],
  },
];

type PropsType = {
  formType: String;
  tableData: SubscriptionItem[];
  setTableData: React.Dispatch<React.SetStateAction<SubscriptionItem[]>>;
  countryList: CountryType[];
  regionList: ContinentType[];
  open: boolean;
  handleClose: () => void;
  selectedRow: SubscriptionForm;
  setSelectedRow: React.Dispatch<React.SetStateAction<SubscriptionForm>>;
};

const ModalForm = ({
  formType,
  tableData,
  setTableData,
  countryList,
  regionList,
  open,
  handleClose,
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

  const formErrors = {
    title: selectedRow.title.length < 1,
    countries: selectedRow.countries.length < 1,
    urgency: selectedRow.urgency.length < 1,
    severity: selectedRow.severity.length < 1,
    certainty: selectedRow.certainty.length < 1,
    methods: selectedRow.methods.length < 1,
  };

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
      if (value.toString().length <= 20)
        setSelectedRow((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVerifyForm(true);

    // Pass with no errors
    if (!Object.values(formErrors).includes(true)) {
      const countryNumberIds: number[] = selectedRow.countries.map(
        (str: string) => Number(str)
      );
      if (selectedRow.id) {
        const res = await updateSubscription({
          variables: {
            subscriptionId: parseInt(selectedRow.id),
            subscriptionName: selectedRow.title,
            countryIds: countryNumberIds,
            urgencyArray: selectedRow.urgency,
            severityArray: selectedRow.severity,
            certaintyArray: selectedRow.certainty,
            subscribeBy: selectedRow.methods,
          },
        });
        console.log(res);
        // const updatedData = tableData.map((item) =>
        //   item.id === res.data.updateSubscription.subscription.id
        //     ? res.data.updateSubscription.subscription
        //     : item
        // );
        // setTableData(updatedData);
      } else {
        const res = await addSubscription({
          variables: {
            subscriptionName: selectedRow.title,
            countryIds: countryNumberIds,
            urgencyArray: selectedRow.urgency,
            severityArray: selectedRow.severity,
            certaintyArray: selectedRow.certainty,
            subscribeBy: selectedRow.methods,
          },
        });
        console.log(res);
        // setTableData([res.data.createSubscription.subscription, ...tableData]);
      }

      setSelectedRow(selectedRow);
      setVerifyForm(false);
      handleClose();
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setVerifyForm(false);
        handleClose();
      }}
      aria-labelledby="modal-title"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h3" fontWeight={"bold"} mb="10px">
          {formType} Subscription
        </Typography>
        <Box component="form" onSubmit={handleSubmit} m={1}>
          <Box sx={{ mb: 1 }}>
            <InputLabel
              htmlFor="title"
              required
              error={verifyForm && formErrors.title}
              className="subs-form-title"
            >
              Title
            </InputLabel>
            <TextField
              id="title"
              name="title"
              size="small"
              variant="outlined"
              value={selectedRow.title}
              onChange={handleChange}
              error={verifyForm && formErrors.title}
              helperText={
                verifyForm && formErrors.title && "You need to enter the title"
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {selectedRow.title.length | 0}
                    /20
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
          {checkBoxList.map((item) => (
            <FormCheckbox
              verifyForm={verifyForm}
              formErrors={formErrors}
              key={item.legend}
              legend={item.legend}
              checkboxItems={item.checkboxItems}
              selectedRow={selectedRow}
              handleChange={handleChange}
            />
          ))}
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="error"
              sx={{ marginRight: "10px" }}
              onClick={handleCancel}
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
  );
};

export default ModalForm;

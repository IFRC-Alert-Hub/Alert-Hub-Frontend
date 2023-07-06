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
import CountrySelectionField from "./CountrySelectionField";
import FormCheckbox from "./FormCheckbox";
import { useMutation } from "@apollo/client";
import { ADD_SUBSCRIPTION } from "../../API/mutations/subscriptionMutation";
import {
  ContinentType,
  CountryType,
  SubscriptionForm,
  SubscriptionItem,
} from "../../API/queries/getSubscriptions";
import { subscription_module } from "../../API/API_Links";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  minWidth: "350px",
  maxHeight: "500px",
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
  tableData: SubscriptionItem[];
  setTableData: React.Dispatch<React.SetStateAction<SubscriptionItem[]>>;
  countryList: CountryType[];
  regionList: ContinentType[];
  open: boolean;
  handleClose: () => void;
};

const ModalForm = ({
  tableData,
  setTableData,
  countryList,
  regionList,
  open,
  handleClose,
}: PropsType) => {
  const [addSubscription] = useMutation(ADD_SUBSCRIPTION, {
    client: subscription_module,
  });
  const [subscriptionForm, setSubscriptionForm] = useState<SubscriptionForm>({
    title: "",
    countries: [],
    urgency: [],
    severity: [],
    certainty: [],
    methods: [],
  });
  const emptyForm = {
    title: "",
    countries: [],
    urgency: [],
    severity: [],
    certainty: [],
    methods: [],
  };

  const [verifyForm, setVerifyForm] = useState(false);

  const formErrors = {
    title: subscriptionForm.title.length < 1,
    countries: subscriptionForm.countries.length < 1,
    urgency: subscriptionForm.urgency.length < 1,
    severity: subscriptionForm.severity.length < 1,
    certainty: subscriptionForm.certainty.length < 1,
    methods: subscriptionForm.methods.length < 1,
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedValues = checked
        ? [...(subscriptionForm[name] as string[]), value]
        : (subscriptionForm[name] as string[]).filter(
            (item: string) => item !== value
          );
      setSubscriptionForm((prevState) => ({
        ...prevState,
        [name]: updatedValues,
      }));
    } else {
      if (value.toString().length <= 20)
        setSubscriptionForm((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setVerifyForm(true);
    if (!Object.values(formErrors).includes(true)) {
      const countryNumberIds: number[] = subscriptionForm.countries.map(
        (str: string) => Number(str)
      );
      const res = await addSubscription({
        variables: {
          userId: 10, // use for test
          subscriptionName: subscriptionForm.title,
          countryIds: countryNumberIds,
          urgencyArray: subscriptionForm.urgency,
          severityArray: subscriptionForm.severity,
          certaintyArray: subscriptionForm.certainty,
          subscribeBy: subscriptionForm.methods,
        },
      });
      setTableData([...tableData, res.data.createSubscription.subscription]);
      setSubscriptionForm(emptyForm);
      setVerifyForm(false);
      handleClose();
    }
  };

  const handleReset = () => {
    setSubscriptionForm(emptyForm);
  };

  // const formik = useFormik({
  //   initialValues: {
  //     title: "",
  //     // countries: [],
  //     // urgency: [],
  //     // severity: [],
  //     // certainty: [],
  //     // methods: [],
  //   },
  //   validationSchema: yup.object({
  //     title: yup.string().required("Title is required"),
  //   }),
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });

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
          Add New Group
        </Typography>
        <Box component="form" onSubmit={handleSubmit} m={1}>
          <Box sx={{ mb: 1 }}>
            <InputLabel
              htmlFor="title"
              required
              error={verifyForm && formErrors.title}
              className="subs-form-title"
            >
              Group Title
            </InputLabel>
            <TextField
              id="title"
              name="title"
              size="small"
              variant="outlined"
              value={subscriptionForm.title}
              onChange={handleChange}
              error={verifyForm && formErrors.title}
              helperText={
                verifyForm && formErrors.title && "You need to enter the title"
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {subscriptionForm.title.length | 0}
                    /20
                  </InputAdornment>
                ),
              }}
              sx={{ width: "100%", mt: 1, mb: 1 }}
            />
          </Box>
          <CountrySelectionField
            verifyForm={verifyForm}
            formErrors={formErrors}
            countryList={countryList}
            regionList={regionList}
            subscriptionForm={subscriptionForm}
            handleChange={handleChange}
          />
          {checkBoxList.map((item) => (
            <FormCheckbox
              verifyForm={verifyForm}
              formErrors={formErrors}
              key={item.legend}
              legend={item.legend}
              checkboxItems={item.checkboxItems}
              subscriptionForm={subscriptionForm}
              handleChange={handleChange}
            />
          ))}
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="outlined"
              color="error"
              sx={{ marginRight: "10px" }}
              onClick={handleReset}
            >
              Reset
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

import { Icon } from "@chakra-ui/icons";
import {
    Button,
    Heading,
    HStack,
    Stack,
    useToast,
    VStack
} from "@chakra-ui/react";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import { AiOutlineUser } from "react-icons/ai";
import { useFetch } from "use-http";
import useLocalStorage from "use-local-storage";
import { NameField, PasswordField } from "../../forms/AuthFields";
import useApi from "../../components/useApi";

export default function Profile() {
  const [adminData, setAdminData] = useLocalStorage<AdminProps | undefined>(
    "adminData",
    undefined
  );
  const initialValues = {
    name: adminData?.name,
    password: "",
    repeatPassword: "",
  };
  const { put, response } = useApi("/user/updateDetail");
  const toast = useToast();

  const editProfile = (values: FormikValues) =>

  {   console.log("----------")
      console.log(values)
      console.log("----------")
      if(values.password == null || values.username ==null || values.name ==null || values.password == ''){
          toast({ title: "the name, user name and password can not be empty",
              status: 'error',onCloseComplete: () => window.location.reload()
          })
          return
      }
     put(values).then((data) => {
      if (response.ok) {
        if (data.status === 200) {
          toast({
            title: "Profile updated successfully!",
            status: "success",
            duration: 3000,
            onCloseComplete: () => {
                setAdminData(data.data)
                window.location.reload()},
          });
        } else {
          toast({ title: data.msg, status: "error" });
        }
        
      } else toast({ title: data.msg, status: "error" });
    });
    }


  return (
    <VStack flexGrow={1} p={12} spacing={5} backgroundRepeat="no-repeat"
                                                  backgroundSize="cover"
                                                  bgImage="url('/image/05b6a71c48ac19ba9097a5bb44daa7e1.png')">
      <HStack>
        <Icon
          boxSize="5rem"
          rounded="full"
          p={3}
          bg="#B578A3"
          as={AiOutlineUser}
        />
        <Heading>{adminData?.name}</Heading>
      </HStack>
      <Formik initialValues={initialValues} onSubmit={editProfile} >
        {(formProps: FormikProps<any>) => (
          <VStack as={Form} spacing={8} bg="gray.50" rounded="3xl">
            <Stack
              gap={5}
              minW="25vw"
              boxShadow="lg"
              rounded="3xl"
              borderWidth={1}
              px={10}
              py={6}
            >
              <NameField icon={AiOutlineUser} />
              <NameField fieldName="username" icon={AiOutlineUser} />
              <PasswordField />
              <PasswordField repeat />
              <Button
                variant="round"
                type="submit"
                isLoading={formProps.isSubmitting}
                bg="#B578A3"
              >
                Edit
              </Button>
            </Stack>
          </VStack>
        )}
      </Formik>
    </VStack>
  );
}

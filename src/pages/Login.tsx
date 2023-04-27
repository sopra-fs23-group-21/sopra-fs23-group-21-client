import { Button, Flex, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import useLocalStorage from "use-local-storage";
import { LineBackground } from "../components/Backgrounds";
import useApi from "../components/useApi";
import { NameField, PasswordField } from "../forms/AuthFields";
import { baseSchema } from "../forms/Schemas";

export default function Login() {
  const [adminData, setAdminData] = useLocalStorage<AdminProps | undefined>(
    "adminData",
    undefined
  );
  const { post, response } = useApi("/user/login");
  const toast = useToast();
  const schema = baseSchema.pick(["username", "password"]);
  const login = (values: FormikValues) =>
    post(new URLSearchParams(values)).then((data) => {
      if (response.ok) {
        if (data.status === 200) {
          setAdminData(data.data);
          window.open("/dashboard", "_top");
        } else {
          toast({ title: data.msg, status: "error" });
        }
      } else {
        toast({ title: data.msg, status: "error" });
      }
    });

  return (
    <VStack
      minH="100vh"
      minW="fit-content"
      p={4}
      spacing={12}
      position="relative"
      justify="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      bgImage="url('/image/05b6a71c48ac19ba9097a5bb44daa7e1.png')"
    >
      <Formik initialValues={schema.getDefaultFromShape()} onSubmit={login}>
        {(formProps: FormikProps<any>) => (
          <VStack as={Form} spacing={8}>
            <VStack
              bg="#AC6A99"
              boxShadow="2xl"
              rounded="xl"
              borderWidth={2}
              px={12}
              py={8}
              spacing={6}
            >
              <NameField fieldName="username" icon={AiOutlineUser} />
              <PasswordField />
              <Button
                variant="round"
                px={8}
                py={6}
                type="submit"
                isDisabled={!formProps.dirty || !formProps.isValid}
                isLoading={formProps.isSubmitting}
              >
                Login
              </Button>
              <HStack spacing={6} justifyContent="end" w="full">
                <Flex gap={1}>
                  <Text>Don't have an account yet?</Text>
                  <Button as={Link} to="/register" variant="link" size="sm">
                    Register
                  </Button>
                  <Text>now!</Text>
                </Flex>
              </HStack>
            </VStack>
          </VStack>
        )}
      </Formik>

      {/* <Button as={Link} to="/" leftIcon={<GrUndo />} variant="ghost">
        Back
      </Button> */}
      <LineBackground transform="scaleY(-1)" viewBox="-1400 0 1500 500" />
    </VStack>
  );
}

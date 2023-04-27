import { Button, Flex, SimpleGrid, useToast, VStack } from "@chakra-ui/react";
import { Form, Formik, FormikProps, FormikValues } from "formik";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { LineBackground } from "../components/Backgrounds";
import useApi from "../components/useApi";
import { NameField, PasswordField } from "../forms/AuthFields";
import { baseSchema } from "../forms/Schemas";

export default function Register() {
  const { post, response } = useApi("/user/register");
  const navigate = useNavigate();
  const toast = useToast();
  const schema = baseSchema.pick([
    "name",
    "username",
    "password",
    "repeatPassword",
  ]);

  const register = (values: FormikValues) =>
    post(values).then((data) =>
      response.ok
        ? navigate(`/verify`)
        : toast({ title: data.message, status: "error" })
    );

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
      <Formik
        initialValues={schema.getDefaultFromShape()}
        validationSchema={schema}
        onSubmit={register}
      >
        {(formProps: FormikProps<any>) => (
          <VStack align="end" as={Form} spacing={10} justifyContent="center">
            <Flex justifyContent="center">
              <SimpleGrid
                minW="max-content"
                spacing={8}
                columns={2}
                bg="#AC6A99"
                boxShadow="lg"
                rounded="3xl"
                borderWidth={1}
                p={10}
                pt={6}
              >
                <NameField fieldName="name" icon={AiOutlineUser} />
                <NameField fieldName="username" icon={AiOutlineUser} />
                <PasswordField />
                <PasswordField repeat />
                <Button
                  variant="round"
                  type="submit"
                  isLoading={formProps.isSubmitting}
                  isDisabled={!formProps.isValid}
                  gridColumn="span 2"
                >
                  Register
                </Button>
              </SimpleGrid>
            </Flex>
          </VStack>
        )}
      </Formik>

      {/* <Button as={Link} to='/' leftIcon={<GrUndo />} variant='ghost'>Back</Button> */}
      <LineBackground transform="scaleY(-1)" viewBox="-1400 0 1500 500" />
    </VStack>
  );
}

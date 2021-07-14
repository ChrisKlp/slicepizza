import { Button, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { CheckoutForm } from 'components';
import { useAuth } from 'context/AuthContext';
import { TInitialFormValues } from 'lib/formatInitialFormValues';
import { formSchema } from 'lib/formSchema';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';

type ProfileFormProps = {
  defaultValues: TInitialFormValues;
};

const ProfileForm: React.FC<ProfileFormProps> = ({ defaultValues }) => {
  const router = useRouter();
  const { user, updateUser, updateUserLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInitialFormValues>({
    resolver: yupResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: TInitialFormValues) => {
    if (!user?.me?.id) return;

    updateUser(user.me.id, data);
    router.push('/profile');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} w="full" justify="flex-start">
        <CheckoutForm register={register} errors={errors} />
        <Button
          type="submit"
          colorScheme="green"
          alignSelf="flex-end"
          isLoading={updateUserLoading}
          loadingText="Updating"
        >
          Update
        </Button>
      </VStack>
    </form>
  );
};

export default ProfileForm;

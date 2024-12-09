import { Box, Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => {
  return (
    <Box
      position="absolute"
      background="black"
      width="100%"
      height="100%"
      top={0}
      left={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      opacity={0.8}
      zIndex="1500"
    >
      <Spinner size="xl" opacity={1} />
    </Box>
  );
};

export default LoadingSpinner;

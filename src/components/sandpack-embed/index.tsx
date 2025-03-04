import { Box, BoxProps } from '@chakra-ui/react'
import { Sandpack, SandpackProps } from '@codesandbox/sandpack-react'
import '@codesandbox/sandpack-react/dist/index.css'

type Props = BoxProps &
  SandpackProps & {
    dependencies?: Record<string, string>
  }

const SandpackEmbed = ({ dependencies, ...props }: Props) => (
  <Box
    as={Sandpack}
    {...props}
    options={{
      ...props.options,
      showLineNumbers: true,
    }}
    theme='dark'
    template='react-ts'
    customSetup={{
      dependencies: {
        'react-icons': '3.11.0',
        '@chakra-ui/react': 'latest',
        '@chakra-ui/icons': 'latest',
        '@emotion/react': '^11.7.0',
        '@emotion/styled': '^11.6.0',
        'framer-motion': '^4.1.17',
        ...dependencies,
      },
    }}
  />
)

export default SandpackEmbed

import {
    Box,
    Stack,
    StackDivider,
    Text,
    RadioGroup,
    Radio,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { FaMobileAlt, FaShieldAlt, FaLock } from 'react-icons/fa'
import { Description } from './Description'
import { HeadingGroup } from '../AccountPage/HeadingGroup'


  const VerificationComponent = (props) => {
    const userId = localStorage.getItem('fuid')
    const [preferedAuth, setPreferedAuth] = useState(props.userInfo.preferedAuth)
    const [statusColor, setStatusColor] = useState('red')
    const [statusMessage, setStatusMessage] = useState('')

    async function savePreferedAuth(){

        const url =
            process.env.REACT_APP_NODE_ENV === 'production'
                ? `https://flint-server.herokuapp.com/users/changepreferedauth/${userId}`
                : `https://flint-server.herokuapp.com/users/changepreferedauth/${userId}`

        const response = await axios.put(url,{
          preferedAuth: preferedAuth
        },{
            headers: {'authorization': `Bearer ${props.accessToken}`}
        })
        if(response.data.status === 200){
          setStatusColor('green')
          setStatusMessage(response.data.message)
          console.log(response.data.user)
          props.setUserInfo(response.data.user)
        } else if(response.data.status === 400){
          setStatusColor('red')
          setStatusMessage(response.data.message)
        }
    }

    useEffect(() => {
        if (preferedAuth === 1 || preferedAuth === 2 || preferedAuth === 0) {
            return
        } else {
            savePreferedAuth()
        }

    },[preferedAuth])

    return (

          <div>
              <HeadingGroup
              title="Verification options"
              description="Add an extra layer of security and protect your account."
              />
              <Box
                rounded={{
                  lg: 'lg',
                }}
                bg={mode('white', 'gray.700')}
                maxW="3xl"
                mx="auto"
                my='6'
                shadow="base"
                overflow="hidden"
              >
                <Box px="6" py="1">
                </Box>
                <Stack spacing="6" divider={<StackDivider />} py="5" px="8">
                  <Description
                    isRecommended
                    title="Authenticator"
                    onAuthOpen={props.onAuthOpen}
                    isAuthOpen={props.isAuthOpen}
                    onRemoveAuthOpen={props.onRemoveAuthOpen}
                    icon={<FaShieldAlt />}
                    setTempSecret={props.setTempSecret}
                    userInfo={props.userInfo}
                    setUserInfo={props.setUserInfo}
                    accessToken={props.accessToken}
                  >
                    Enter a code generated by your authenticator app to confirm it’s you.
                  </Description>
                  <Description
                    title="Phone verification"
                    icon={<FaMobileAlt />}
                    userInfo={props.userInfo}
                    setUserInfo={props.setUserInfo}
                    accessToken={props.accessToken}
                    onAddPhoneOpen={props.onAddPhoneOpen}
                    onAddPhoneClose={props.onAddPhoneClose}
                    isAddPhoneOpen={props.isAddPhoneOpen}
                    onRemovePhoneOpen={props.onRemovePhoneOpen}
                    onRemovePhoneClose={props.onRemovePhoneClose}
                    isRemovePhoneOpen={props.isRemovePhoneOpen}
                  >
                    Receive a text to your mobile phone to confirm it’s you on login.
                  </Description>

                  <Stack
                    direction={{
                      base: 'column',
                      sm: 'row',
                    }}
                    spacing="5"
                    justify="space-between"
                    pos="relative"
                  >
                    <Stack
                      direction={{
                        base: 'column',
                        sm: 'row',
                      }}
                      spacing="4"
                      align="flex-start"
                      flex="1"
                    >
                      <Box aria-hidden fontSize="2xl" pt="1" color="gray.500">
                        <FaLock/>
                      </Box>
                        <Box flex="1">
                          <Box as="h4" fontWeight="bold" maxW="xl">
                            <span>Prefered Login</span>
                          </Box>
                        <Box
                          maxW={{
                            base: 'xs',
                            md: 'unset',
                          }}
                          pb='2'
                          color={mode('gray.600', 'gray.400')}
                          fontSize="sm"
                        >
                        <span>Select which method of authentication you would like to use when you login.</span>
                        </Box>
                        <RadioGroup onChange={(e) => setPreferedAuth(e)} value={props.userInfo.preferedAuth}>
                          <Stack direction="row">

                            <Radio
                              isDisabled={!props.userInfo.isAuthEnabled}
                              value={1}
                            >
                              Authenticator
                            </Radio>

                            <Radio
                              isDisabled={!props.userInfo.isSmsVerified}
                              value={2}
                            >
                              SMS Text
                            </Radio>

                          </Stack>
                        </RadioGroup>
                        <Text
                          color={statusColor}
                          pt="1"
                          pl='2'
                        >
                          {statusMessage}
                        </Text>
                        </Box>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
          </div>
    )
  }

export default VerificationComponent;

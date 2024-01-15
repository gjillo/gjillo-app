import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Alert, AlertTitle, Typography} from "@mui/material";
import {getProviders} from "next-auth/react";
import ProviderButton from "@components/ProviderButton";
import {getSession} from "@utility/getSession";
import {redirect} from "next/navigation";
import {SignInPageErrorParam} from "@node_modules/@auth/core/types";

const signinErrors: Record<Lowercase<SignInPageErrorParam | "default">, string> = {
  default: "Unable to sign in.",
  signin: "Try signing in with a different account.",
  oauthsignin: "Try signing in with a different account.",
  oauthcallbackerror: "Try signing in with a different account.",
  oauthcreateaccount: "Try signing in with a different account.",
  emailcreateaccount: "Try signing in with a different account.",
  callback: "Try signing in with a different account.",
  oauthaccountnotlinked:
    "To confirm your identity, sign in with the same account you used originally.",
  emailsignin: "The e-mail could not be sent.",
  credentialssignin:
    "Sign in failed. Check the details you provided are correct.",
  sessionrequired: "Please sign in to access this page.",
}

type Props = {
  searchParams?: { error?: SignInPageErrorParam };
}

export default async function SignIn({searchParams}: Props) {
  const session = await getSession();

  if (process.env.APP_ENV === 'test' || session) {
    return redirect('/dashboard');
  }

  const providers = await getProviders();
  const {error: errorType} = searchParams ?? {error: undefined};
  const error =
    errorType &&
    (signinErrors[errorType.toLowerCase() as Lowercase<SignInPageErrorParam>] ??
      signinErrors.default);

  return (
    <Grid container component="main" sx={{height: '100vh'}}>
      <CssBaseline/>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: 'palette.grey[50]',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
            sx={{
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
      >
        <Box
          sx={{
            mx: 4,
            height: 'fit-content',
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {error &&
            <Alert
              severity="error"
              sx={{
                top: '-2rem',
                left: '50%',
                width: '100%',
                position: 'absolute',
                transform: 'translate(-50%, -100%)'
              }}
            >
              <AlertTitle>Sign in error occured</AlertTitle>
              {error}
            </Alert>
          }
          <Typography
            variant="h3"
            sx={{
              mb: 1
            }}
          >Gjillo</Typography>

          <Typography
            variant="caption"
            sx={{
              mb: 3
            }}
          >To begin, select an existing or new account to sign in with</Typography>
          <Paper
            elevation={3}
            sx={{
              py: 2,
              px: 2,
              minWidth: '62.5%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {providers && Object.values(providers).map((provider, i, p) => (
              <ProviderButton
                key={provider.id}
                provider={provider}
                sx={{
                  ...(i !== p.length - 1 ? {mb: 1} : {})
                }}
                data-cy={'github'}
              >Sign in with {provider.name}</ProviderButton>
            ))}
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
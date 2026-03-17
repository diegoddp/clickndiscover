# clickndiscover

Static Spartamax landing page and supporting assets.

## Deployment

Pushes to `main` trigger GitHub Actions deployment over SSH to Hostinger.

Required GitHub repository secrets:

- `SSH_HOST`
- `SSH_USER`
- `SSH_PRIVATE_KEY`
- `SSH_PORT`
- `SSH_TARGET_PATH`

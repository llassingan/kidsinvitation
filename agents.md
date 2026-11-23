To create image for assets, use this curl format:
curl https://api.ezkielyna.store/v1/images/generations \
  -H "Authorization: Bearer sk-5pOpvzMmFtJkTAABLNjyPBm33c9vjopojD4t7gCcbFwuPGPr" \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-image-2.5","prompt":"{YOUR_PROMPT_HERE}"}'
  Dont create/hit it too many timse!. Image generation = costly!

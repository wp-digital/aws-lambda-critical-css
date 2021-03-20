# AWS Lambda Critical CSS

### Description

AWS Lambda function for generating critical stylesheets.

### WordPress

Initially this function was created to be used with WordPress via plugin [AWS Lambda Critical CSS](https://github.com/innocode-digital/wp-critical-css-aws-lambda), 
so you just need to install plugin.

### Basic usage (non WordPress)

Event JSON:

| **Name** | **Type** | **Description** |
|----------|----------|-----------------|
| key | `string` | Identifier, it could be a template name. |
| styles | `array`  | List of original CSS files. |
| url | `string` | URL for grabbing critical CSS. |
| hash | `string` | Version hash. |
| return_url | `string` | Endpoint where result should be returned. |
| secret | `string` | Secret to be added to POST callback request. |

#### Notes

- Hash is something how you can determine that callback is still actual. There is MD5 hash of concatenated string of
  stylesheet names with file version is used in WordPress plugin.
- Secret is for authorization. In WordPress plugin this secret has 20 minutes live time
  ([15 minutes](https://aws.amazon.com/ru/about-aws/whats-new/2018/10/aws-lambda-supports-functions-that-can-run-up-to-15-minutes/#:~:text=You%20can%20now%20configure%20your,Lambda%20function%20was%205%20minutes.)
  is a maximum execution time of AWS Lambda function and plus 5 minutes of reserve).

Example: 
  
````
{
  "key": "single",
  "styles": [
    "https://site.com/css/bootstrap.min.css",
    "https://site.com/css/screen.min.css?ver=1.0.0"
  ],
  "url": "https://www.site.com/blog/hello-world/",
  "hash": "a05d2d03525b97379c42ef1525a4a6b9",
  "return_url": "https://site.com/api/v1/stylesheet",
  "secret": "aQ3qnPPnDwhaB7pzI3Y0jQx*"
}
````

### Installation

- **Use this template** from Github.
- [Create AWS Access Keys](https://www.serverless.com/framework/docs/providers/aws/guide/credentials#creating-aws-access-keys).
  You can follow [this gist](https://gist.github.com/ServerlessBot/7618156b8671840a539f405dea2704c8) to create policy.
- Add **API Key** & **Secret** with **Region** to Github **Repository secrets** into `AWS_ACCESS_KEY_ID`,
  `AWS_SECRET_ACCESS_KEY` and `AWS_REGION` variables.
- Deploy function with Github Actions. `dev` branch will be deployed on push into **critical-css-dev-processor** function,
  production should be deployed manually through `workflow_dispatch` into **critical-css-production-processor**.

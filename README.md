# AWS Lambda Critical CSS

### Description

AWS Lambda function for generating critical stylesheets.

### WordPress

Initially this function was created to be used with WordPress via plugin [AWS Lambda Critical CSS](https://github.com/innocode-digital/wp-critical-css-aws-lambda), 
so you just need to install plugin.

### Basic usage (non WordPress)

Add environment variable. **Key** is how Lambda will identify your site and **Value** is a secret.

Event JSON:

| **Name** | **Type** | **Description** |
|----------|----------|-----------------|
| key | `string` | Identifier, it could be a template name |
| styles | `array`  | List of original CSS files |
| url | `string` | URL for grabbing critical CSS |
| hash | `string` | Version hash |
| return_url | `string` | REST API endpoint where result should be returned |
| site_key | `string` | Site identifier |

Example: 

````
{
  "key": "single",
  "styles": [
    "https://site.com/css/bootstrap.min.css",
    "https://site.com/css/screen.min.css"
  ],
  "url": "https://www.site.com/blog/hello-world/",
  "hash": "a05d2d03525b97379c42ef1525a4a6b9",
  "return_url": "https://site.com/api/v1/stylesheet",
  "site_key": "site"
}
````
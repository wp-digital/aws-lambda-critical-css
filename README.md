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
| hash | `string` | Version hash. There is MD5 hash of concatenated string of stylesheet names with version is used in plugin. |
| return_url | `string` | Endpoint where result should be returned. |
| secret | `string` | Secret to be added to POST callback request. |

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

- Use this template
- More to be added soon...

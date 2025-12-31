using System.Text;

namespace CAT.Model
{
    public static class ApiCodeBuilder
    {
        public static string BuildControllerMethod(ApiRequestConfig request)
        {
            if (string.IsNullOrWhiteSpace(request.ApiName))
                throw new ArgumentException("API name is required.");

            if (string.IsNullOrWhiteSpace(request.ApiBaseUrl))
                throw new ArgumentException("API base URL is required.");

            ////if (!request.HasMultipleInputs && request.Parameters?.Any() == true)
            ////    throw new ArgumentException(
            ////        "Parameters are not allowed when HasMultipleInputs is false."
            ////    );

            var sb = new StringBuilder();

            // HTTP Attribute
            sb.AppendLine($"[Http{request.ApiMethodType}]");
            sb.AppendLine($"[Route(\"{request.ApiBaseUrl}\")]");

            // Method signature
            sb.Append($"public IActionResult {request.ApiName}(");

            if (request.HasMultipleInputs && request.Parameters != null)
            {
                sb.Append(string.Join(", ",
                    request.Parameters.Select(p => $"{p.DataType} {p.Name}")));
            }

            sb.AppendLine(")");
            sb.AppendLine("{");
            sb.AppendLine("    try");
            sb.AppendLine("    {");
            sb.AppendLine("        // TODO: Business logic");
            sb.AppendLine("        return Ok();");
            sb.AppendLine("    }");
            sb.AppendLine("    catch (Exception ex)");
            sb.AppendLine("    {");
            sb.AppendLine("        return StatusCode(500, ex.Message);");
            sb.AppendLine("    }");
            sb.AppendLine("}");

            return sb.ToString();
        }
    }

}

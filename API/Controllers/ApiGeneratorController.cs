using CAT.Model;
using Microsoft.AspNetCore.Mvc;

namespace CAT.Controllers
{
    [ApiController]
    [Route("api/generator")]
    public class ApiGeneratorController : ControllerBase
    {
        [HttpPost("generate")]
        public IActionResult GenerateApi([FromBody] ApiRequestConfig request)
        {
            try
            {
                var code = ApiCodeBuilder.BuildControllerMethod(request);
                return Ok(new { GeneratedCode = code });
            }
            catch (ArgumentException ex)
            {
                // Validation / input-related issues
                return BadRequest(new
                {
                    Message = ex.Message
                });
            }
            catch (Exception ex)
            {
                // Unexpected errors
                return StatusCode(500, new
                {
                    Message = "An error occurred while generating API",
                    Details = ex.Message
                });
            }
        }
    }


}

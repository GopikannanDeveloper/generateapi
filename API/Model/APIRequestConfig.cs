namespace CAT.Model
{
    public class ApiRequestConfig
    {
        public ApiMethodType ApiMethodType { get; set; }
        public string ApiBaseUrl { get; set; }      // api/product
        public string ApiName { get; set; }         // GetProducts
        public bool HasMultipleInputs { get; set; } // Input4
        public List<ApiParameter>? Parameters { get; set; }
    }

    public enum ApiMethodType
    {
        GET,
        POST,
        PUT,
        DELETE
    }

}

using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ServiceApp.UI.Utils
{
    public class EnvConfig
    {
        public static string APIUrl { get; set; }

        public EnvConfig(IConfiguration config)
        {
            APIUrl = config["APIUrl"];
            
        }
    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ServiceApp.API.Controllers
{
    [Authorize]
    public class AdminController: ControllerBase
    {
    }
}

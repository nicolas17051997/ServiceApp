﻿using System;
using System.Collections.Generic;
using System.Text;

namespace ServiceApp.DAL.Models
{
   public class Products
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public bool Status { get; set; }
    }
}

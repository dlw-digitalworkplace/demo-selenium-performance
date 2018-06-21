using System;
using System.Diagnostics;
using System.Threading;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

namespace Selenium.ConsoleApp
{
  class Program
  {
    static void Main(string[] args)
    {
      IWebDriver driver = new ChromeDriver();
      try
      {
        driver.Navigate().GoToUrl("https://<TENANT>.sharepoint.com");

        Console.WriteLine(driver.Title);

        driver.FindElement(By.Name("loginfmt")).SendKeys("<USERNAME>");
        driver.FindElement(By.Id("idSIButton9")).Click();

        while (driver.FindElement(By.Name("passwd")).GetAttribute("class") != "form-control")
        {
          Thread.Sleep(250);
        }

        driver.FindElement(By.Name("passwd")).SendKeys("<PASSWORD>");
        driver.FindElement(By.Id("idSIButton9")).Click();

        while (driver.FindElement(By.Id("KmsiDescription")).Text != "Do this to reduce the number of times you are asked to sign in.")
        {
          Thread.Sleep(250);
        }

        driver.FindElement(By.Id("idSIButton9")).Click();

        var stopwatch = new Stopwatch();
        stopwatch.Start();

        driver.Navigate().GoToUrl("https://<TENANT>.sharepoint.com");

        while (!YammerExists(driver))
        {
          Thread.Sleep(10);
        }

        stopwatch.Stop();

        Console.WriteLine(driver.Title);
        Console.WriteLine("Page loaded in {0}ms", stopwatch.ElapsedMilliseconds);
      }
      finally
      {
        driver.Quit();
      }
    }

    private static bool YammerExists(IWebDriver driver)
    {
      try
      {
        driver.FindElement(By.ClassName("yammer_placeholder_a32c1320"));
        return true;
      }
      catch (Exception)
      {
        return false;
      }
    }
  }
}
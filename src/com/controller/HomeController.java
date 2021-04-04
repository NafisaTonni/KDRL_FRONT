package com.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

/**
 * Handles requests for the application home page.
 */
@Controller
@RequestMapping("/")
public class HomeController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	
	
	/* ############################# User Management ####################################### */
	
	 
	
	@RequestMapping(value = { "/" }, method = RequestMethod.GET)
	public ModelAndView indexPage(ModelMap model) {
		String message = "Hello World, Spring MVC @ Javatpoint";
		return new ModelAndView("homepage", "message", message);
		
	}
	 
	
	@RequestMapping(value = { "/home" }, method = RequestMethod.GET)
	public ModelAndView homePage(ModelMap model) {
		String message = "Hello World, Spring MVC @ Javatpoint";
		return new ModelAndView("home", "message", message);
		
	}

	@RequestMapping(value = { "/gallery" }, method = RequestMethod.GET)
	public ModelAndView galleryPage(ModelMap model) {
		String message = "Hello World, Spring MVC @ Javatpoint";
		return new ModelAndView("gallery", "message", message);
		
	}
	
	@RequestMapping(value = { "/buyLoad" }, method = RequestMethod.GET)
	public ModelAndView buyLoadPage(ModelMap model) {
		String message = "Hello World, Spring MVC @ Javatpoint";
		return new ModelAndView("buyLoad", "message", message);
		
	}
	@RequestMapping(value = { "/product" }, method = RequestMethod.GET)
	public ModelAndView productRegPage(ModelMap model) {
		String message = "Hello World, Spring MVC @ Javatpoint";
		return new ModelAndView("product", "message", message);
		
	}
	
	@RequestMapping(value = { "/locator" }, method = RequestMethod.GET)
	public ModelAndView locatorPage(ModelMap model) {
		String message = "Hello World, Spring MVC @ Javatpoint";
		return new ModelAndView("locator", "message", message);
		
	}
	
	@RequestMapping(value = { "/contact" }, method = RequestMethod.GET)
	public ModelAndView contactPage(ModelMap model) {
		String message = "Hello World, Spring MVC @ Javatpoint";
		return new ModelAndView("contact", "message", message);
		
	}
	
	@RequestMapping(value = { "/FAQ" }, method = RequestMethod.GET)
	public ModelAndView FAQPage(ModelMap model) {
		String message = "Hello World, Spring MVC @ Javatpoint";
		return new ModelAndView("FAQ", "message", message);
		
	}
	
	@RequestMapping(value = { "/companyProfile" }, method = RequestMethod.GET)
	public ModelAndView companyProfilePage(ModelMap model) {
		String message = "Hello World, Spring MVC @ Javatpoint";
		return new ModelAndView("companyProfile", "message", message);
		
	}
	@RequestMapping(value = { "/boardOfDirector" }, method = RequestMethod.GET)
	public ModelAndView boardOfDirectorPage(ModelMap model) {
		String message = "Hello World, Spring MVC @ Javatpoint";
		return new ModelAndView("boardOfDirector", "message", message);
		
	}
	
}

public ActionResult UploadFile(HttpPostedFileBase file)
{
    //int id = data.id;
    //HttpPostedFileBase file = data.file;

    //Console.WriteLine("Id: "+id);
    if (file == null)
    {
        Console.WriteLine("Internal Error!");
        return Json(new { url = "", rel=""}, JsonRequestBehavior.AllowGet);
    }
    string saveUrl, relUrl;
    //bool res = CustomFileIO.UploadSingleFileLocal_Force(id, out saveUrl, "Tb8", file);
    bool res = CustomFileIO.UploadSingleFileFTP(out saveUrl,out relUrl, "Tb8", file);
    if (res == false)
    {
        return Json(new { url = "" , rel = "" }, JsonRequestBehavior.AllowGet);
    }

    return Json(new { url = saveUrl, rel = relUrl }, JsonRequestBehavior.AllowGet);
}

public static bool UploadSingleFileFTP(out string saveUrl, out string relUrl, string saveDir, HttpPostedFileBase file)
{
    saveUrl = null;
    relUrl = null;
    if (file == null)
    {
        Console.WriteLine("Internal Error!");
        return false;
    }
    string ftp = ConfigurationManager.AppSettings["ftpserver"].ToString();
    //string ftpFolder = saveDir + "/";
    byte[] filesBytes = null;
    string ftpUsername = ConfigurationManager.AppSettings["ftpuser"].ToString();
    string ftpPassword = ConfigurationManager.AppSettings["ftppass"].ToString();
    string fileName, extention, uploadPath, tmpRelName;
    fileName = Path.GetFileNameWithoutExtension(file.FileName);
    string time = DateTime.Now.ToString("yyyyMMdd_HHmmss");

    fileName = time + "_"  + fileName;
    extention = Path.GetExtension(file.FileName);

    uploadPath = ftp + saveDir + '/';
    tmpRelName = saveDir + '/' + fileName + extention;
    string tmpFilename = uploadPath + fileName + extention;
    using (BinaryReader br = new BinaryReader(file.InputStream))
    {
        filesBytes = br.ReadBytes(file.ContentLength);
    }

    try
    {
        FtpWebRequest req = (FtpWebRequest)WebRequest.Create(tmpFilename);
        req.Method = WebRequestMethods.Ftp.UploadFile;

        req.Credentials = new NetworkCredential(ftpUsername, ftpPassword);
        req.ContentLength = filesBytes.Length;
        req.UsePassive = true;
        req.UseBinary = true;
        req.ServicePoint.ConnectionLimit = filesBytes.Length;
        req.EnableSsl = false;
        using (Stream reqStream = req.GetRequestStream())
        {
            reqStream.Write(filesBytes, 0, filesBytes.Length);
            reqStream.Close();
        }
    }
    catch(WebException ex)
    {
        relUrl = "";
        saveUrl = "";
        return false;
    }
    relUrl = tmpRelName;
    saveUrl = tmpFilename;
    return true;
}
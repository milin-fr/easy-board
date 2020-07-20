<?php

namespace App\Controller\Main;

use App\Entity\Project;
use App\Form\ProjectType;
use App\Repository\FolderRepository;
use App\Repository\ProjectRepository;
use App\Repository\ProjectStatusRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MainController extends AbstractController
{
    /**
     * @Route("/", name="home")
     */
    public function home(ProjectStatusRepository $projectStatusRepository)
    {
        $projectStatuses = $projectStatusRepository->findAll();
        return $this->render('main/home.html.twig', [
            'projectStatuses' => $projectStatuses,
        ]);
    }

    /**
     * @Route("/folders", name="folders")
     */
    public function folders(FolderRepository $folderRepository)
    {
        $folders = $folderRepository->findAll();
        return $this->render('main/folders.html.twig', [
            'folders' => $folders,
        ]);
    }
}

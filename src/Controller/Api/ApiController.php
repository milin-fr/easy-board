<?php

namespace App\Controller\Api;

use App\Entity\Project;
use App\Form\ProjectType;
use App\Repository\ProjectRepository;
use App\Repository\ProjectStatusRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/api")
 */
class ApiController extends AbstractController
{
    /**
     * @Route("/project-post", name="project_post", methods={"POST"})
     */
    public function projectPost(Request $request, EntityManagerInterface $em, ProjectStatusRepository $projectStatusRepository)
    {
        $project = new Project();
        $contentObject = json_decode($request->getContent());
        $projectTitle = $contentObject->projectTitle;
        // $projectDescription = $contentObject->project_description;
        // $project->setDescription($projectDescription);
        $project->setTitle($projectTitle);
        $project->setProjectStatus($projectStatusRepository->find(1));
        $em->persist($project);
        $em->flush();
        return $this->json($project, 200, [], ['groups' => 'get:projects']);
    }
}

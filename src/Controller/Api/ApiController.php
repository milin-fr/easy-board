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
        $projectDescription = $contentObject->projectDescription;
        $project->setDescription($projectDescription);
        $project->setTitle($projectTitle);
        $project->setProjectStatus($projectStatusRepository->find(1));
        $em->persist($project);
        $em->flush();
        return $this->json($project, 200, [], ['groups' => 'get:projects']);
    }

    /**
     * @Route("/project-put/{id<\d+>}", name="project_put", methods={"PUT"})
     */
    public function projectPut($id, Request $request, EntityManagerInterface $em, ProjectRepository $projectRepository)
    {
        $project = $projectRepository->find($id);
        $contentObject = json_decode($request->getContent());
        $projectTitle = $contentObject->projectTitle;
        $projectDescription = $contentObject->projectDescription;
        $project->setDescription($projectDescription);
        $project->setTitle($projectTitle);
        $em->flush();
        return $this->json($project, 200, [], ['groups' => 'get:projects']);
    }

    /**
     * @Route("/project-status-update", name="project_status_update", methods={"PUT"})
     */
    public function projectStatusUpdate(Request $request, EntityManagerInterface $em, ProjectRepository $projectRepository, ProjectStatusRepository $projectStatusRepository)
    {
        $contentObject = json_decode($request->getContent());
        $project = $projectRepository->find($contentObject->projectId);
        // $oldProjectStatus = $project->getProjectStatus();
        $newProjectStatus = $projectStatusRepository->find($contentObject->statusId);
        // $oldProjectStatus->removeProject($project);
        // $newProjectStatus->addProject($project);
        $project->setProjectStatus($newProjectStatus);
        $em->flush();
        return $this->json($project, 200, [], ['groups' => 'get:projects']);
    }
}

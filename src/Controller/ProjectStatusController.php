<?php

namespace App\Controller;

use App\Entity\ProjectStatus;
use App\Form\ProjectStatusType;
use App\Repository\ProjectStatusRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/project/status")
 */
class ProjectStatusController extends AbstractController
{
    /**
     * @Route("/", name="project_status_index", methods={"GET"})
     */
    public function index(ProjectStatusRepository $projectStatusRepository): Response
    {
        return $this->render('project_status/index.html.twig', [
            'project_statuses' => $projectStatusRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="project_status_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $projectStatus = new ProjectStatus();
        $form = $this->createForm(ProjectStatusType::class, $projectStatus);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($projectStatus);
            $entityManager->flush();

            return $this->redirectToRoute('project_status_index');
        }

        return $this->render('project_status/new.html.twig', [
            'project_status' => $projectStatus,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="project_status_show", methods={"GET"})
     */
    public function show(ProjectStatus $projectStatus): Response
    {
        return $this->render('project_status/show.html.twig', [
            'project_status' => $projectStatus,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="project_status_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, ProjectStatus $projectStatus): Response
    {
        $form = $this->createForm(ProjectStatusType::class, $projectStatus);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('project_status_index');
        }

        return $this->render('project_status/edit.html.twig', [
            'project_status' => $projectStatus,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="project_status_delete", methods={"DELETE"})
     */
    public function delete(Request $request, ProjectStatus $projectStatus): Response
    {
        if ($this->isCsrfTokenValid('delete'.$projectStatus->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($projectStatus);
            $entityManager->flush();
        }

        return $this->redirectToRoute('project_status_index');
    }
}

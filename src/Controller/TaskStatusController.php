<?php

namespace App\Controller;

use App\Entity\TaskStatus;
use App\Form\TaskStatusType;
use App\Repository\TaskStatusRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/task/status")
 */
class TaskStatusController extends AbstractController
{
    /**
     * @Route("/", name="task_status_index", methods={"GET"})
     */
    public function index(TaskStatusRepository $taskStatusRepository): Response
    {
        return $this->render('task_status/index.html.twig', [
            'task_statuses' => $taskStatusRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="task_status_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $taskStatus = new TaskStatus();
        $form = $this->createForm(TaskStatusType::class, $taskStatus);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($taskStatus);
            $entityManager->flush();

            return $this->redirectToRoute('task_status_index');
        }

        return $this->render('task_status/new.html.twig', [
            'task_status' => $taskStatus,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="task_status_show", methods={"GET"})
     */
    public function show(TaskStatus $taskStatus): Response
    {
        return $this->render('task_status/show.html.twig', [
            'task_status' => $taskStatus,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="task_status_edit", methods={"GET","POST"})
     */
    public function edit(Request $request, TaskStatus $taskStatus): Response
    {
        $form = $this->createForm(TaskStatusType::class, $taskStatus);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('task_status_index');
        }

        return $this->render('task_status/edit.html.twig', [
            'task_status' => $taskStatus,
            'form' => $form->createView(),
        ]);
    }

    /**
     * @Route("/{id}", name="task_status_delete", methods={"DELETE"})
     */
    public function delete(Request $request, TaskStatus $taskStatus): Response
    {
        if ($this->isCsrfTokenValid('delete'.$taskStatus->getId(), $request->request->get('_token'))) {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($taskStatus);
            $entityManager->flush();
        }

        return $this->redirectToRoute('task_status_index');
    }
}
